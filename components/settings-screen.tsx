"use client"

import { ChevronRight, Bell, Moon, User, HelpCircle, Info } from "lucide-react"

export function SettingsScreen() {
  const settingsItems = [
    { icon: User, label: "Account", description: "Manage your profile" },
    { icon: Bell, label: "Notifications", description: "Configure alerts" },
    { icon: Moon, label: "Appearance", description: "Theme preferences" },
    { icon: HelpCircle, label: "Help & Support", description: "Get assistance" },
    { icon: Info, label: "About", description: "App information" },
  ]

  return (
    <div className="px-4 pb-32" style={{ paddingTop: '66px' }}>
      {/* Header */}
      <h1
        className="text-foreground mb-6 text-center"
        style={{
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        }}
      >
        Settings
      </h1>

      {/* Settings List */}
      <div className="space-y-4">
        {settingsItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-4 bg-[#F8F8F8] rounded-xl border-0 shadow-none hover:bg-[#F8F8F8] transition-colors text-left"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          )
        })}
      </div>

      {/* App Version */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">One Thing v1.0.0</p>
      </div>
    </div>
  )
}
