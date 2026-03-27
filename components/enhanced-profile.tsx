"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { SocialLinks } from "@/components/social-links"
import { DynamicStatus } from "@/components/dynamic-status"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, Mail, Phone, Languages, Briefcase, ArrowUpRight } from "lucide-react"
import { getPersonalInfo, getAboutInfo } from "@/lib/data"

export function EnhancedProfile() {
  const [activeTab, setActiveTab] = useState("about")

  const personalInfo = getPersonalInfo()
  const aboutInfo = getAboutInfo()

  return (
    <Card className="bg-surface border-border col-span-1 flex flex-col">
      <CardContent className="p-0">
        <div className="p-4 sm:p-6 flex flex-col items-center border-b border-border">
          <div className="flex flex-col items-center w-full">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden mb-4 border border-border-hover">
              <Image
                src={personalInfo.avatar || "/placeholder.svg"}
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{personalInfo.name}</h2>
              <p className="text-sm text-muted-foreground mb-1">{personalInfo.title}</p>
              <div className="flex items-center justify-center text-xs text-zinc-500 mb-3">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center mb-4">
            {personalInfo.badges.map((badge, index) => (
              <span key={index} className="text-xs px-2 py-0.5 border border-border-hover text-muted-foreground">
                {badge}
              </span>
            ))}
          </div>

          <SocialLinks socialLinks={personalInfo.social} />
          <DynamicStatus />
        </div>

        <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b border-border">
            <TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0">
              <TabsTrigger
                value="about"
                className={`flex-1 rounded-none border-b-2 px-2 sm:px-4 py-2 text-xs sm:text-sm transition-colors ${
                  activeTab === "about" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className={`flex-1 rounded-none border-b-2 px-2 sm:px-4 py-2 text-xs sm:text-sm transition-colors ${
                  activeTab === "contact" ? "border-white text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className="p-4 sm:p-6 space-y-5 focus:outline-none">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">About</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">{aboutInfo.bio}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Focus</h3>
              <div className="space-y-1.5">
                {aboutInfo.focus.map((item, index) => (
                  <p key={index} className="text-sm text-zinc-300">&mdash; {item}</p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Languages</h3>
              <div className="space-y-2">
                {aboutInfo.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-zinc-300">{language.name}</span>
                    <span className="text-xs text-zinc-500">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="p-4 sm:p-6 space-y-4 focus:outline-none">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-zinc-500" />
                <div>
                  <h4 className="text-sm font-medium">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm text-muted-foreground hover:text-white transition-colors break-all underline underline-offset-2">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-zinc-500" />
                <div>
                  <h4 className="text-sm font-medium">Phone</h4>
                  <a href={`tel:${personalInfo.phone}`} className="text-sm text-muted-foreground hover:text-white transition-colors underline underline-offset-2">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-zinc-500" />
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">{personalInfo.location}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">References</h4>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <p className="text-white">Daniel Schlegel</p>
                  <p>CS & HCI Professor, SUNY Oswego</p>
                  <a href="mailto:daniel.schlegel@oswego.edu" className="text-muted-foreground hover:text-white transition-colors underline underline-offset-2">
                    daniel.schlegel@oswego.edu
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <a
          href="https://calendar.app.google/8y4Xp8cMWiiwUT6F9"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-4 border-t border-border flex items-center justify-center gap-2 group hover:bg-surface-alt transition-colors"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          <span className="text-xs text-muted-foreground group-hover:text-white transition-colors">
            Book a meeting
          </span>
          <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
        </a>
      </CardContent>
    </Card>
  )
}
