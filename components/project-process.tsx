"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ProcessStep } from "@/lib/projects"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

interface ProjectProcessProps {
  steps: ProcessStep[]
}

export function ProjectProcess({ steps }: ProjectProcessProps) {
  const [activeStep, setActiveStep] = useState(0)

  const handlePrevious = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))
  }

  const handleNext = () => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))
  }

  if (!steps || steps.length === 0) {
    return null
  }

  const currentStep = steps[activeStep]

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Project Process</h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <span>
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Content Display */}
          <div className="mb-4 sm:mb-6">
            <AnimatedSection key={currentStep.id} animation="fade-in">
              {currentStep.type === "image" && (
                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={currentStep.content || "/placeholder.svg"}
                    alt={currentStep.title || "Project process image"}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {currentStep.type === "video" && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={currentStep.content}
                    title={currentStep.title || "Project process video"}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {currentStep.type === "figma" && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={currentStep.content}
                    title={currentStep.title || "Figma design"}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              {currentStep.type === "text" && (
                <div className="bg-zinc-800/50 p-4 sm:p-6 rounded-lg">
                  <p className="text-zinc-300">{currentStep.content}</p>
                </div>
              )}
            </AnimatedSection>
          </div>

          {/* Step Info */}
          <AnimatedSection key={`info-${currentStep.id}`} animation="fade-up">
            <div className="space-y-2">
              {currentStep.title && <h3 className="text-base sm:text-lg font-semibold">{currentStep.title}</h3>}
              {currentStep.description && <p className="text-sm text-zinc-400">{currentStep.description}</p>}
            </div>
          </AnimatedSection>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeStep === index ? "bg-purple-400 w-4" : "bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
