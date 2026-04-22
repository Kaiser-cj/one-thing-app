"use client"

import { Check, Minus, Filter, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ActivityTask {
  id: string
  title: string
  status: "completed" | "missed"
  completedAt?: string
  date: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

function groupTasksByDate(tasks: ActivityTask[]): Record<string, ActivityTask[]> {
  return tasks.reduce((acc, task) => {
    if (!acc[task.date]) {
      acc[task.date] = []
    }
    acc[task.date].push(task)
    return acc
  }, {} as Record<string, ActivityTask[]>)
}

interface ActivityScreenProps {
  tasks: ActivityTask[]
}

export function ActivityScreen({ tasks }: ActivityScreenProps) {
  const groupedTasks = groupTasksByDate(tasks)
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  )

  return (
    <div className="pb-32" style={{ paddingTop: '66px', paddingLeft: '24px', paddingRight: '24px' }}>
      {/* Header */}
      <div className="flex items-center justify-center relative mb-6">
        <h1 
          className="text-foreground text-center"
          style={{ 
            fontSize: '16px', 
            fontWeight: 500,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
          }}
        >
          Activity
        </h1>
        <button
          className="absolute right-0 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
          style={{ width: '40px', height: '40px' }}
          aria-label="Filter tasks"
        >
          <Filter style={{ width: '22px', height: '22px', color: '#909090' }} />
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <h2 
                className="whitespace-nowrap"
                style={{ 
                  fontSize: '14px', 
                  fontWeight: 500,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                  color: '#D4D4D4'
                }}
              >
                {formatDate(date)}
              </h2>
              <div className="flex-1" style={{ height: '0.5px', backgroundColor: 'rgba(212, 212, 212, 0.6)' }} />
            </div>
            <div className="space-y-4">
              {groupedTasks[date].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedDates.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">No activity yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Your completed and missed tasks will appear here
          </p>
        </div>
      )}
    </div>
  )
}

function TaskCard({ task }: { task: ActivityTask }) {
  const isCompleted = task.status === "completed"

  return (
    <div 
      className={cn(
        "rounded-xl border-0 flex items-center gap-3 px-4 w-full",
        ""
      )}
      style={{ 
        height: '72px',
        backgroundColor: '#F8F8F8',
        boxShadow: 'none'
      }}
    >
      {/* Status Icon */}
      {isCompleted ? (
        <div 
          className="flex items-center justify-center rounded-full bg-[#4a8c3f] shrink-0"
          style={{ width: '20px', height: '20px' }}
        >
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      ) : (
        <div 
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: '20px', height: '20px', backgroundColor: '#909090' }}
        >
          <Minus className="h-3 w-3 text-white" strokeWidth={3} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p
          className={cn(
            isCompleted ? "text-foreground" : "line-through"
          )}
          style={{ 
            fontSize: '16px', 
            fontWeight: 500,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
            color: isCompleted ? undefined : '#D9D9D9'
          }}
        >
          {task.title}
        </p>
        <p style={{ fontSize: '12px', color: '#909090', marginTop: '2px' }}>
          {isCompleted ? `Completed · ${task.completedAt}` : "Missed"}
        </p>
      </div>

      {/* Three-dot menu */}
      <button 
        className="p-1 hover:text-foreground transition-colors shrink-0"
        style={{ color: '#909090' }}
        aria-label="Task options"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  )
}
