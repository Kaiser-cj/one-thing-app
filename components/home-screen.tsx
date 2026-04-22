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
    .map((value) => String(value).padStart(2, "0"))
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

    const updateElapsed = () => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - activeTaskStartedAt) / 1000)))
    }

    updateElapsed()
    const interval = setInterval(updateElapsed, 1000)
    return () => clearInterval(interval)
  }, [activeTaskStartedAt])

  const hasActiveTask = Boolean(activeTaskTitle && activeTaskStartedAt)

  return (
    <div className="flex flex-col items-center" style={{ height: 'calc(100vh - 120px)' }}>
      {hasActiveTask ? (
        <div className="w-full flex flex-col items-center" style={{ paddingTop: "128px" }}>
          <div
            className="flex flex-col items-center"
            style={{
              width: "366px",
              height: "478px",
              padding: "24px",
              backgroundColor: "#F8F8F8",
              borderRadius: "20px",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: "48px", height: "48px", backgroundColor: "rgba(95, 155, 76, 0.1)" }}
            >
              <BriefcaseBusiness style={{ width: "24px", height: "24px", color: "#5F9B4C" }} />
            </div>
            <p
              className="text-foreground text-center"
              style={{
                marginTop: "16px",
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "1.3",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
              }}
            >
              {activeTaskTitle}
            </p>
            <div style={{ width: "318px", marginTop: "16px", borderTop: "1px dashed #D9D9D9" }} />

            <div className="flex flex-col items-center" style={{ marginTop: "16px" }}>
              <div className="flex items-center" style={{ gap: "8px" }}>
                <Clock3 style={{ width: "18px", height: "18px", color: "#5F9B4C" }} />
                <p
                  style={{
                    fontSize: "14px",
                    color: "#AAAAAA",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Time Spent
                </p>
              </div>
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "48px",
                  fontWeight: 700,
                  color: "#5F9B4C",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                }}
              >
                {formatElapsed(elapsedSeconds)}
              </p>
            </div>

            <div
              className="flex items-center justify-center text-center"
              style={{
                width: "264px",
                height: "38px",
                marginTop: "16px",
                padding: "10.5px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(95, 155, 76, 0.1)",
                color: "#5F9B4C",
                fontSize: "12px",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
              }}
            >
              Stay focused! You&apos;ve got this 💪
            </div>

            <div style={{ width: "318px", marginTop: "24px", borderTop: "1px dashed #D9D9D9" }} />

            <Button
              onClick={onMarkComplete}
              className="text-white"
              style={{
                width: "318px",
                height: "45px",
                marginTop: "24px",
                borderRadius: "10px",
                backgroundColor: "#5F9B4C",
                fontSize: "16px",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
              }}
            >
              Mark as Completed
            </Button>
            <Button
              onClick={onGiveUp}
              variant="outline"
              className="bg-transparent text-[#5F9B4C] hover:bg-transparent"
              style={{
                width: "318px",
                height: "45px",
                marginTop: "12px",
                borderRadius: "10px",
                border: "1px solid #5F9B4C",
                fontSize: "16px",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
              }}
            >
              Skip Task
            </Button>
          </div>

          <div
            className="flex items-center"
            style={{
              width: "366px",
              height: "72px",
              marginTop: "37px",
              marginBottom: "85px",
              borderRadius: "20px",
              backgroundColor: "#F8F8F8",
              padding: "16px",
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: "40px", height: "40px", backgroundColor: "rgba(95, 155, 76, 0.1)" }}
            >
              <div className="flex items-center" style={{ gap: "2px" }}>
                <Sparkles style={{ width: "14px", height: "14px", color: "#5F9B4C" }} />
                <Sparkles style={{ width: "14px", height: "14px", color: "#5F9B4C" }} />
              </div>
            </div>
            <div style={{ marginLeft: "12px" }}>
              <p
                style={{
                  fontSize: "16px",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                }}
              >
                Small steps today, big wins tomorrow.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#5F9B4C",
                  fontFamily:
                    '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                }}
              >
                Keep showing up
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1
            className="text-foreground text-center whitespace-nowrap"
            style={{
              marginTop: '54px',
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
            }}
          >
            Any Plans for Today?
          </h1>
          <div className="flex-1 flex items-center justify-center w-full">
          <Button
            onClick={onCreatePlan}
            variant="outline"
            className="bg-transparent hover:bg-muted text-foreground rounded-full text-base font-medium border border-border"
            style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px', paddingBottom: '16px' }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Today&apos;s Plan
          </Button>
          </div>
        </>
      )}
    </div>
  )
}
