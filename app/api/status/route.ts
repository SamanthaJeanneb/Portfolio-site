import { google } from 'googleapis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if Google Calendar credentials are available
    const hasGoogleCredentials = 
      process.env.GOOGLE_CLIENT_ID && 
      process.env.GOOGLE_CLIENT_SECRET && 
      process.env.GOOGLE_REFRESH_TOKEN

    let currentActivity = null
    let currentActivityEndTime = null
    let nextEvent = null

    // Only fetch calendar data if credentials are available
    if (hasGoogleCredentials) {
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

      // Handle token refresh automatically
      oauth2Client.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
          // If a new refresh token is provided, you might want to save it
          console.log('New refresh token received')
        }
      })

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Get current activity (events happening now)
    const now = new Date()
      try {
        // Try to refresh the token first if needed
        try {
          await oauth2Client.getAccessToken()
        } catch (tokenError: any) {
          if (tokenError.code === 'invalid_grant') {
            console.error('Invalid refresh token. Please regenerate your Google OAuth refresh token.')
            throw new Error('INVALID_REFRESH_TOKEN')
          }
          throw tokenError
        }

    const currentEventsResponse = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: new Date(now.getTime() - 15 * 60000).toISOString(), // 15 minutes ago
      timeMax: new Date(now.getTime() + 15 * 60000).toISOString(), // 15 minutes from now
      singleEvents: true,
      orderBy: 'startTime',
    })

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
      } catch (calendarError: any) {
        // Handle specific error types
        if (calendarError.message === 'INVALID_REFRESH_TOKEN' || calendarError.code === 'invalid_grant') {
          console.error('Google Calendar authentication failed: Invalid refresh token. Please regenerate your OAuth credentials.')
        } else {
          console.error('Calendar API error:', calendarError.message || calendarError)
        }
        // Continue without calendar data - user will show as available
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
          
          if (pushEvent && pushEvent.payload.commits && pushEvent.payload.commits.length > 0) {
            // Get the first commit message, remove newlines and truncate if too long
            const commitMessage = pushEvent.payload.commits[0].message
              ? pushEvent.payload.commits[0].message.split('\n')[0].trim()
              : null
            
            // If message is not in the event payload, try to fetch it from the commit API
            let finalMessage = commitMessage || 'Recent commit'
            
            if (!commitMessage && pushEvent.payload.commits[0].sha) {
              try {
                const commitSha = pushEvent.payload.commits[0].sha
                const repoFullName = pushEvent.repo.name
                const commitResponse = await fetch(
                  `https://api.github.com/repos/${repoFullName}/commits/${commitSha}`,
                  {
                    headers: {
                      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                      'Accept': 'application/vnd.github.v3+json',
                    },
                  }
                )
                
                if (commitResponse.ok) {
                  const commitData = await commitResponse.json()
                  finalMessage = commitData.commit?.message?.split('\n')[0].trim() || 'Recent commit'
                }
              } catch (commitError) {
                console.warn('Failed to fetch commit details:', commitError)
              }
            }
            
            recentCommit = {
              repo: pushEvent.repo.name.split('/')[1],
              repoFullName: pushEvent.repo.name,
              message: finalMessage,
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
      isAvailable: !currentActivity
    })

  } catch (error) {
    console.error('Status API error:', error)
    
    // Return a valid response even on error, so the component can still render
    return NextResponse.json({
      currentActivity: null,
      currentActivityEndTime: null,
      recentCommit: null,
      nextEvent: null,
      isAvailable: true
    })
  }
}
