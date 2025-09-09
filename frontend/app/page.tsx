"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, BarChart3, TrendingUp, Users, Clock, Heart } from "lucide-react"
import { LoginModal } from "@/components/login-modal"
import { useAuth } from "@/components/auth-provider"

const SpotifyLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

const AppleMusicLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.001-.08-.004-.12-.004H5.986c-.04 0-.08.003-.12.004-.525.015-1.046.057-1.563.15-.674.121-1.304.353-1.878.727-.574.374-1.204.606-1.878.727-.517.093-1.038.135-1.563.15-.04.001-.08.004-.12.004h12.028c.04 0 .08-.003.12-.004.526-.015 1.047-.057 1.564-.15.673-.121 1.303-.353 1.877-.727 1.118-.732 1.863-1.732 2.18-3.044.175-.719.24-1.451.24-2.189V6.124zM9.28 18.433c-.924 0-1.674-.75-1.674-1.674s.75-1.674 1.674-1.674 1.674.75 1.674 1.674-.75 1.674-1.674 1.674zm9.402-3.348c-.462 0-.924-.231-1.155-.693-.231-.462-.077-.924.154-1.309l1.617-2.694c.231-.385.693-.539 1.155-.539s.924.231 1.155.693c.231.462.077.924-.154 1.309l-1.617 2.694c-.231.385-.693.539-1.155.539z" />
  </svg>
)

export default function HomePage() {
  const [currentTheme, setCurrentTheme] = useState<"spotify" | "apple">("spotify")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { isAuthenticated, user } = useAuth()

  const toggleTheme = () => {
    const newTheme = currentTheme === "spotify" ? "apple" : "spotify"
    setCurrentTheme(newTheme)

    // Apply theme classes to document body and html
    if (newTheme === "apple") {
      document.body.classList.add("apple-music")
      document.documentElement.classList.add("apple-music")
    } else {
      document.body.classList.remove("apple-music")
      document.documentElement.classList.remove("apple-music")
    }
  }

  useEffect(() => {
    if (currentTheme === "spotify") {
      document.body.classList.remove("apple-music")
      document.documentElement.classList.remove("apple-music")
    }
  }, [])

  const handleLogin = (platform: "spotify" | "apple") => {
    setCurrentTheme(platform)
    setShowLoginModal(true)
  }

  if (isAuthenticated && user) {
    window.location.href = "/dashboard"
    return null
  }

  return (
    <div
      className={`min-h-screen ${currentTheme === "apple" ? "apple-music-bg" : "spotify-bg"} transition-all duration-500`}
    >
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-lg ${currentTheme === "spotify" ? "spotify-gradient" : "apple-music-gradient"}`}
            >
              <Music className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">MusicStats</h1>
          </div>

          <div className="flex items-center bg-card border border-border rounded-xl p-1 shadow-sm">
            <Button
              variant={currentTheme === "spotify" ? "default" : "ghost"}
              size="sm"
              onClick={() => currentTheme !== "spotify" && toggleTheme()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentTheme === "spotify"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <SpotifyLogo className="h-4 w-4" />
              <span className="font-medium">Spotify</span>
            </Button>
            <Button
              variant={currentTheme === "apple" ? "default" : "ghost"}
              size="sm"
              onClick={() => currentTheme !== "apple" && toggleTheme()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentTheme === "apple"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <AppleMusicLogo className="h-4 w-4" />
              <span className="font-medium">Apple Music</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              currentTheme === "spotify" ? "spotify-gradient" : "apple-music-gradient"
            } shadow-lg`}
          >
            {currentTheme === "spotify" ? (
              <SpotifyLogo className="h-4 w-4 text-white" />
            ) : (
              <AppleMusicLogo className="h-4 w-4 text-white" />
            )}
            <span className="text-white text-sm font-medium">
              {currentTheme === "spotify" ? "Spotify" : "Apple Music"} Analytics
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Discover Your Music
            <span className="text-primary"> Journey</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Get detailed insights into your {currentTheme === "spotify" ? "Spotify" : "Apple Music"} listening habits.
            Track your top artists, songs, genres, and discover patterns in your music taste.
          </p>

          <Button
            size="lg"
            onClick={() => handleLogin(currentTheme)}
            className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {currentTheme === "spotify" ? (
              <SpotifyLogo className="mr-2 h-5 w-5" />
            ) : (
              <AppleMusicLogo className="mr-2 h-5 w-5" />
            )}
            Connect {currentTheme === "spotify" ? "Spotify" : "Apple Music"}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Music Analytics</h2>
            <p className="text-muted-foreground text-lg">
              Unlock insights from your {currentTheme === "spotify" ? "Spotify" : "Apple Music"} data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Top Tracks</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  See your most played songs across different time periods and discover your music evolution.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Favorite Artists</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore your top artists and see how your preferences change over time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Listening Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your total listening time and see when you're most active musically.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Genre Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover your genre preferences and explore new music based on your taste.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Detailed Charts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Visualize your music data with beautiful charts and interactive graphs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Music Discovery</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized recommendations based on your listening patterns and preferences.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Your Music?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Connect your {currentTheme === "spotify" ? "Spotify" : "Apple Music"} account and start discovering insights
            about your music taste today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => handleLogin(currentTheme)}
              className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {currentTheme === "spotify" ? (
                <SpotifyLogo className="mr-2 h-5 w-5" />
              ) : (
                <AppleMusicLogo className="mr-2 h-5 w-5" />
              )}
              Get Started with {currentTheme === "spotify" ? "Spotify" : "Apple Music"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={toggleTheme}
              className="text-lg px-8 py-6 rounded-xl bg-transparent border-2 hover:bg-muted/50 transition-all duration-200"
            >
              {currentTheme === "spotify" ? (
                <AppleMusicLogo className="mr-2 h-5 w-5" />
              ) : (
                <SpotifyLogo className="mr-2 h-5 w-5" />
              )}
              Try {currentTheme === "spotify" ? "Apple Music" : "Spotify"} Instead
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`p-1 rounded ${currentTheme === "spotify" ? "spotify-gradient" : "apple-music-gradient"}`}>
              {currentTheme === "spotify" ? (
                <SpotifyLogo className="h-4 w-4 text-white" />
              ) : (
                <AppleMusicLogo className="h-4 w-4 text-white" />
              )}
            </div>
            <span className="font-semibold">MusicStats</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Discover your music journey with detailed analytics from your favorite streaming platform.
          </p>
        </div>
      </footer>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} initialPlatform={currentTheme} />
    </div>
  )
}
