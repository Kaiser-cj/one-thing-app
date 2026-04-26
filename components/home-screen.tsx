"use client"

import { useEffect, useState } from "react"
import { BriefcaseBusiness, Clock3, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HomeScreenProps {
  onCreatePlan: () => void
  activeTaskTitle?: string
  activeTaskStartedAt?: number | null
  onMarkComplete: () => void
  onGiveUp: () => void
}

function formatElapsed(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return [hours, minutes, remainingSeconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":")
}

export function HomeScreen({
  onCreatePlan,
  activeTaskTitle,
  activeTaskStartedAt,
  onMarkComplete,
  onGiveUp,
}: HomeScreenProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    if (!activeTaskStartedAt) {
      setElapsedSeconds(0)
      return
    }

    const update = () => {
      setElapsedSeconds(
        Math.max(0, Math.floor((Date.now() - activeTaskStartedAt) / 1000))
      )
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [activeTaskStartedAt])

  const hasActiveTask = Boolean(activeTaskTitle && activeTaskStartedAt)

  return (
    <div className="min-h-screen flex flex-col items-center w-full px-4 bg-white">
      {hasActiveTask ? (
        <div className="w-full flex flex-col items-center pt-24">
          
          {/* MAIN CARD */}
          <div className="w-full max-w-md bg-[#F8F8F8] rounded-[20px] p-6 flex flex-col items-center">
            
            {/* ICON */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#5F9B4C]/10">
              <BriefcaseBusiness className="w-6 h-6 text-[#5F9B4C]" />
            </div>

            {/* TITLE */}
            <p className="mt-4 text-[22px] font-medium text-center leading-tight">
              {activeTaskTitle}
            </p>

            {/* DIVIDER */}
            <div className="w-full border-t border-dashed border-[#D9D9D9] my-4" />

            {/* TIMER */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-[#AAAAAA] text-sm">
                <Clock3 className="w-4 h-4 text-[#5F9B4C]" />
                Time Spent
              </div>

              <p className="mt-2 text-[44px] font-bold text-[#5F9B4C] tracking-tight">
                {formatElapsed(elapsedSeconds)}
              </p>
            </div>

            {/* MOTIVATION */}
            <div className="w-full mt-4 rounded-[10px] bg-[#5F9B4C]/10 text-[#5F9B4C] text-sm py-2 text-center">
              Stay focused! You&apos;ve got this 💪
            </div>

            {/* DIVIDER */}
            <div className="w-full border-t border-dashed border-[#D9D9D9] my-5" />

            {/* BUTTONS */}
            <Button
              onClick={onMarkComplete}
              className="w-full h-[45px] rounded-[10px] text-white text-[16px] font-medium"
              style={{ backgroundColor: "#5F9B4C" }}
            >
              Mark as Completed
            </Button>

            <Button
              onClick={onGiveUp}
              variant="outline"
              className="w-full h-[45px] mt-3 rounded-[10px] text-[#5F9B4C] border-[#5F9B4C] text-[16px] font-medium bg-transparent hover:bg-transparent"
            >
              Skip Task
            </Button>
          </div>

          {/* BOTTOM CARD */}
          <div className="w-full max-w-md mt-8 mb-20 bg-[#F8F8F8] rounded-[20px] p-4 flex items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5F9B4C]/10">
              <Sparkles className="w-4 h-4 text-[#5F9B4C]" />
            </div>

            <div className="ml-3">
              <p className="text-[15px]">
                Small steps today, big wins tomorrow.
              </p>
              <p className="text-sm font-medium text-[#5F9B4C]">
                Keep showing up
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <h1 className="mt-16 text-[22px] sm:text-[26px] font-medium text-center leading-tight px-4">
            Any Plans for Today?
          </h1>

          {/* CTA */}
          <div className="flex-1 flex items-center justify-center w-full">
            <Button
              onClick={onCreatePlan}
              variant="outline"
              className="flex items-center gap-2 px-6 py-4 rounded-full text-base font-medium border border-border bg-transparent hover:bg-muted"
            >
              <Plus className="w-5 h-5" />
              Create Today&apos;s Plan
            </Button>
          </div>
        </>
      )}
    </div>
  )
}