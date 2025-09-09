"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Music, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlatform?: "spotify" | "apple"
}

export function LoginModal({ isOpen, onClose, initialPlatform = "spotify" }: LoginModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"spotify" | "apple">(initialPlatform)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (platform: "spotify" | "apple") => {
    setIsLoading(true)
    try {
      await login(platform)
      onClose()
      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Connect Your Music
          </DialogTitle>
          <DialogDescription>
            Choose your music streaming platform to get started with your personalized analytics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Platform Selection */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={selectedPlatform === "spotify" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPlatform("spotify")}
              className="flex-1"
              disabled={isLoading}
            >
              Spotify
            </Button>
            <Button
              variant={selectedPlatform === "apple" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPlatform("apple")}
              className="flex-1"
              disabled={isLoading}
            >
              Apple Music
            </Button>
          </div>

          {/* Login Button */}
          <Button onClick={() => handleLogin(selectedPlatform)} disabled={isLoading} className="w-full" size="lg">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Connect {selectedPlatform === "spotify" ? "Spotify" : "Apple Music"}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By connecting, you agree to our terms of service and privacy policy. We only access your listening history
            to provide analytics.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
