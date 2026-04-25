"use client"

import { useEffect, useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/home-screen"
import { CreatePlanSheet } from "@/components/create-plan-sheet"
import { ActivityScreen, type ActivityTask } from "@/components/activity-screen"
import { SettingsScreen } from "@/components/settings-screen"

type Tab = "home" | "activity" | "settings"
type ActiveTask = {
  title: string
  startedAt: number
  date: string
}

function getTodayKey(): string {
  return new Date().toISOString().split("T")[0]
}

function formatTime(timeMs: number): string {
  return new Date(timeMs).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase()
}

export default function OneThing() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)
  const [activeTask, setActiveTask] = useState<ActiveTask | null>(null)
  const [activityTasks, setActivityTasks] = useState<ActivityTask[]>([])

  const handleCreatePlan = (title: string) => {
    setActiveTask({
      title,
      startedAt: Date.now(),
      date: getTodayKey(),
    })
    setIsCreatePlanOpen(false)
  }

  const handleMarkComplete = () => {
    if (!activeTask) return
    const completedTask: ActivityTask = {
      id: String(Date.now()),
      title: activeTask.title,
      status: "completed",
      completedAt: formatTime(Date.now()),
      date: activeTask.date,
    }
    setActivityTasks((prev) => [completedTask, ...prev])
    setActiveTask(null)
  }

  const handleGiveUp = () => {
    if (!activeTask) return
    const missedTask: ActivityTask = {
      id: String(Date.now()),
      title: activeTask.title,
      status: "missed",
      date: activeTask.date,
    }
    setActivityTasks((prev) => [missedTask, ...prev])
    setActiveTask(null)
  }

  useEffect(() => {
    if (!activeTask) return

    const checkForDayRollover = () => {
      if (activeTask.date === getTodayKey()) return
      const rolloverMissedTask: ActivityTask = {
        id: String(Date.now()),
        title: activeTask.title,
        status: "missed",
        date: activeTask.date,
      }
      setActivityTasks((prev) => [rolloverMissedTask, ...prev])
      setActiveTask(null)
    }

    checkForDayRollover()
    const interval = setInterval(checkForDayRollover, 60000)
    return () => clearInterval(interval)
  }, [activeTask])

  const activeTaskForToday = activeTask && activeTask.date === getTodayKey() ? activeTask : null

  return (
    <div className="min-h-screen bg-background w-full max-w-[430px] mx-auto relative">
      {/* Main Content */}
      <main className="min-h-screen">
        {activeTab === "home" && (
          <HomeScreen
            onCreatePlan={() => setIsCreatePlanOpen(true)}
            activeTaskTitle={activeTaskForToday?.title}
            activeTaskStartedAt={activeTaskForToday?.startedAt ?? null}
            onMarkComplete={handleMarkComplete}
            onGiveUp={handleGiveUp}
          />
        )}
        {activeTab === "activity" && <ActivityScreen tasks={activityTasks} />}
        {activeTab === "settings" && <SettingsScreen />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Create Plan Bottom Sheet */}
      <CreatePlanSheet
        isOpen={isCreatePlanOpen}
        onClose={() => setIsCreatePlanOpen(false)}
        onCreatePlan={handleCreatePlan}
      />
    </div>
  )
}
