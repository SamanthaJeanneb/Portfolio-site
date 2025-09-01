import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'urn:ietf:wg:oauth:2.0:oob'
    )

    // Set credentials with refresh token
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Get current activity (events happening now)
    const now = new Date()
    const currentEventsResponse = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: new Date(now.getTime() - 15 * 60000).toISOString(), // 15 minutes ago
      timeMax: new Date(now.getTime() + 15 * 60000).toISOString(), // 15 minutes from now
      singleEvents: true,
      orderBy: 'startTime',
    })

    let currentActivity = null
    let currentActivityEndTime = null
    if (currentEventsResponse.data.items && currentEventsResponse.data.items.length > 0) {
      const currentEvent = currentEventsResponse.data.items[0]
      const eventStart = new Date(currentEvent.start?.dateTime || currentEvent.start?.date || '')
      const eventEnd = new Date(currentEvent.end?.dateTime || currentEvent.end?.date || '')
      
      if (now >= eventStart && now <= eventEnd) {
        currentActivity = currentEvent.summary
        currentActivityEndTime = eventEnd.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true,
          timeZone: 'America/New_York'
        })
      }
    }

    // Get upcoming events for tech events
    const upcomingEventsResponse = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 20,
      singleEvents: true,
      orderBy: 'startTime',
    })

    // Check tech events calendar if available
    let techEventsResponse = null
    if (process.env.TECH_EVENTS_CALENDAR_ID) {
      try {
        techEventsResponse = await calendar.events.list({
          calendarId: process.env.TECH_EVENTS_CALENDAR_ID,
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        })
      } catch (error) {
        console.warn('Tech calendar access failed:', error)
      }
    }

    // Combine events from both calendars
    const allUpcomingEvents = [
      ...(upcomingEventsResponse.data.items || []),
      ...(techEventsResponse?.data.items || [])
    ]

    // Find next tech event
    const techKeywords = ['hack', 'conference', 'workshop', 'meetup', 'tech', 'coding', 'dev', 'summit', 'expo']
    
    let nextEvent = null
    for (const event of allUpcomingEvents) {
      const title = event.summary?.toLowerCase() || ''
      const isTechEvent = techKeywords.some(keyword => title.includes(keyword))
      
      if (isTechEvent) {
        const eventDate = new Date(event.start?.dateTime || event.start?.date || '')
        const daysUntil = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysUntil > 0) {
          nextEvent = {
            title: event.summary,
            date: eventDate.toISOString(),
            daysUntil
          }
          break
        }
      }
    }

    // Get recent GitHub commits
    let recentCommit = null
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_USERNAME) {
      try {
        const githubResponse = await fetch(
          `https://api.github.com/users/${process.env.GITHUB_USERNAME}/events`,
          {
            headers: {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        )

        if (githubResponse.ok) {
          const events = await githubResponse.json()
          const pushEvent = events.find((event: any) => event.type === 'PushEvent')
          
          if (pushEvent) {
            recentCommit = {
              repo: pushEvent.repo.name.split('/')[1],
              message: pushEvent.payload.commits?.[0]?.message || 'Recent commit',
              date: pushEvent.created_at,
            }
          }
        }
      } catch (error) {
        console.error('GitHub API error:', error)
      }
    }

    return NextResponse.json({
      currentActivity,
      currentActivityEndTime,
      recentCommit,
      nextEvent,
      debug: {
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
        upcomingEventsCount: allUpcomingEvents.length,
        currentTime: now.toISOString()
      }
    })

  } catch (error) {
    console.error('Status API error:', error)
    
    return NextResponse.json({
      currentActivity: null,
      recentCommit: null,
      nextEvent: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: {
        hasClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary'
      }
    }, { status: 500 })
  }
}
