"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface CreatePlanSheetProps {
  isOpen: boolean
  onClose: () => void
  onCreatePlan: (title: string) => void
}

const motivationalQuotes = [
  { quote: "Each morning sees some task begun, each evening sees it close", author: "Longfellow" },
  { quote: "Focus on being productive instead of busy", author: "Tim Ferriss" },
  { quote: "The secret of getting ahead is getting started", author: "Mark Twain" },
]

export function CreatePlanSheet({ isOpen, onClose, onCreatePlan }: CreatePlanSheetProps) {
  const [title, setTitle] = useState("")
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [refinedTask, setRefinedTask] = useState("")
const [isRefining, setIsRefining] = useState(false)
const [inputFocused, setInputFocused] = useState(false)
  useEffect(() => {
    if (!isOpen) return
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isOpen])

  const handleSubmit = () => {
    if (title.trim()) {
      onCreatePlan(title.trim())
      setTitle("")
      onClose()
    }
  }
  const handleClarify = async () => {
    if (!title.trim()) return
    setIsRefining(true)
    try {
      const res = await fetch("/api/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: title }),
      })
      const data = await res.json()
      setRefinedTask(data.refined)
    } catch (e) {
      console.error(e)
    } finally {
      setIsRefining(false)
    }
  }

  const currentQuote = motivationalQuotes[currentQuoteIndex]

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sheet */}
      <div
        className={cn(
          "fixed left-0 right-0 bottom-0 bg-white z-[100] transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ top: "60px", borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-plan-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <h2
              id="create-plan-title"
              className="text-foreground"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              Create Plan
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
              style={{ width: "40px", height: "40px", backgroundColor: "#F2F2F2" }}
              aria-label="Close"
            >
              <ChevronDown style={{ width: "18px", height: "18px" }} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-6 flex flex-col">
            {/* Input */}
            <div className="mb-6">
              <label
                htmlFor="plan-title"
                className="block text-foreground mb-2"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                Enter Project Title
              </label>
              <div className="relative flex flex-col">
              <div className="relative">
                <Input
                  id="plan-title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setInputFocused(true)}
onBlur={() => setInputFocused(false)}
                  className="pr-12 text-base rounded-lg border border-transparent focus-visible:border-[#4a8c3f] focus-visible:ring-1 focus-visible:ring-[#4a8c3f]"
                  style={{ height: "50px", backgroundColor: "rgba(224, 224, 224, 0.5)" }}
                />
                <button
  type="button"
  onClick={handleClarify}
  disabled={isRefining || !title.trim()}
  className="absolute right-3 bottom-3 p-1 flex items-center justify-center"
  aria-label="AI refinement"
>
  <span style={{ fontSize: "18px", fontWeight: 600 }}>
    {isRefining ? "..." : "✦"}
  </span>
</button>
                {inputFocused && (
  <p className="text-xs text-[#4a8c3f] mt-2">
    ✦ Tap the star to refine with AI
  </p>
)}
                
</div>
              </div>
              {refinedTask && (
  <div className="mt-3 p-3 rounded-xl border border-[#4a8c3f]/30 bg-[#4a8c3f]/10">
    <p className="text-xs text-[#4a8c3f] font-medium mb-1">✦ Suggested</p>
    <p className="text-sm text-foreground mb-2">{refinedTask}</p>
    <div className="flex gap-2">
      <button
        onClick={() => { setTitle(refinedTask); setRefinedTask("") }}
        className="text-xs px-3 py-1 rounded-full bg-[#4a8c3f] text-white"
      >
        Accept
      </button>
      <button
        onClick={() => setRefinedTask("")}
        className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
      >
        Dismiss
      </button>
    </div>
  </div>
)}
            </div>

            {/* Quote Card */}
            <div className="mt-auto mt-6">
              <div className="rounded-2xl p-6 w-full" style={{ backgroundColor: "#F0F7EE" }}>
                <div className="text-center">
                  <p className="text-foreground text-base italic mb-3 transition-opacity duration-500">
                    &ldquo;{currentQuote.quote}&rdquo;
                  </p>
                  <p className="text-muted-foreground text-sm">
                    — {currentQuote.author}
                  </p>
                </div>
                {/* Quote indicators */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {motivationalQuotes.map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        index === currentQuoteIndex 
                          ? "w-4 bg-[#4a8c3f]" 
                          : "w-1.5 bg-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-6 pb-8 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="w-full bg-[#5F9B4C] hover:bg-[#568f45] text-white rounded-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: "56px",
                fontSize: "16px",
                fontWeight: 500,
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
              }}
            >
              Create Plan
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
