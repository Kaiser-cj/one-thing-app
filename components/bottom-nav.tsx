"use client"

import { Home, Activity, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "home" | "activity" | "settings"

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as Tab, label: "Home", icon: Home },
    { id: "activity" as Tab, label: "Activity", icon: Activity },
    { id: "settings" as Tab, label: "Settings", icon: Settings },
  ]

  return (
    <nav 
      className="fixed z-50 flex justify-center"
      style={{ bottom: '24px', left: '24px', right: '24px' }}
    >
      <div 
        className="bg-[#4a8c3f] flex items-center shadow-lg"
        style={{ width: '366px', height: '72px', borderRadius: '30px', padding: '5px', gap: '0px' }}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-col items-center justify-center transition-all duration-200",
                isActive ? "text-[#4a8c3f]" : "text-white/80 hover:text-white"
              )}
              style={isActive ? { 
                width: '101px', 
                height: '62px', 
                borderRadius: '25px',
              } : {
                flex: 1,
                height: '62px',
              }}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <span 
                  className="absolute inset-0 bg-white border-0"
                  style={{ borderRadius: '25px', border: 'none', boxShadow: 'none' }}
                />
              )}
              <Icon 
                className={cn("relative z-10", isActive && "text-[#4a8c3f]")} 
                style={{ width: '24px', height: '24px' }}
              />
              <span 
                className={cn("relative z-10", isActive ? "font-medium" : "font-normal")} 
                style={{ fontSize: '12px' }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
