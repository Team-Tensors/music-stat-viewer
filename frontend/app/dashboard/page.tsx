"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Music, TrendingUp, Users, Heart, ArrowLeft, Play, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// Mock data for demonstration
const mockData = {
  topTracks: [
    { name: "Blinding Lights", artist: "The Weeknd", plays: 247, duration: "3:20" },
    { name: "Watermelon Sugar", artist: "Harry Styles", plays: 189, duration: "2:54" },
    { name: "Levitating", artist: "Dua Lipa", plays: 156, duration: "3:23" },
    { name: "Good 4 U", artist: "Olivia Rodrigo", plays: 134, duration: "2:58" },
    { name: "Stay", artist: "The Kid LAROI & Justin Bieber", plays: 128, duration: "2:21" },
  ],
  topArtists: [
    { name: "The Weeknd", plays: 1247, genres: ["Pop", "R&B"] },
    { name: "Dua Lipa", plays: 892, genres: ["Pop", "Dance"] },
    { name: "Harry Styles", plays: 756, genres: ["Pop", "Rock"] },
    { name: "Olivia Rodrigo", plays: 634, genres: ["Pop", "Alternative"] },
    { name: "Billie Eilish", plays: 589, genres: ["Alternative", "Pop"] },
  ],
  genres: [
    { name: "Pop", percentage: 45 },
    { name: "R&B", percentage: 23 },
    { name: "Alternative", percentage: 18 },
    { name: "Rock", percentage: 14 },
  ],
  stats: {
    totalMinutes: 12847,
    totalTracks: 1456,
    topGenre: "Pop",
    avgSessionLength: "23 min",
  },
}

export default function DashboardPage() {
  const [currentTheme, setCurrentTheme] = useState<"spotify" | "apple">("spotify")
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/"
      return
    }

    // Set theme based on user's platform
    if (user?.platform) {
      setCurrentTheme(user.platform)
      if (user.platform === "apple") {
        document.body.classList.add("apple-music")
      } else {
        document.body.classList.remove("apple-music")
      }
    }
  }, [isAuthenticated, user])

  const toggleTheme = () => {
    const newTheme = currentTheme === "spotify" ? "apple" : "spotify"
    setCurrentTheme(newTheme)

    if (newTheme === "apple") {
      document.body.classList.add("apple-music")
    } else {
      document.body.classList.remove("apple-music")
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (!isAuthenticated || !user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-lg ${currentTheme === "spotify" ? "spotify-gradient" : "apple-music-gradient"}`}
              >
                <Music className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">Your Music Stats</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.platform} User</p>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={currentTheme === "spotify" ? "default" : "ghost"}
                size="sm"
                onClick={() => currentTheme !== "spotify" && toggleTheme()}
                className="text-xs"
              >
                Spotify
              </Button>
              <Button
                variant={currentTheme === "apple" ? "default" : "ghost"}
                size="sm"
                onClick={() => currentTheme !== "apple" && toggleTheme()}
                className="text-xs"
              >
                Apple Music
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Listening Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTime(mockData.stats.totalMinutes)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tracks Played</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.totalTracks.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Genre</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.topGenre}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Session</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.stats.avgSessionLength}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tracks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
            <TabsTrigger value="artists">Top Artists</TabsTrigger>
            <TabsTrigger value="genres">Genres</TabsTrigger>
          </TabsList>

          <TabsContent value="tracks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Most Played Tracks
                </CardTitle>
                <CardDescription>Your top songs from the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.topTracks.map((track, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{track.name}</p>
                          <p className="text-sm text-muted-foreground">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{track.plays} plays</span>
                        <span className="text-sm text-muted-foreground">{track.duration}</span>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artists" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Your Favorite Artists
                </CardTitle>
                <CardDescription>Artists you've listened to the most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.topArtists.map((artist, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{artist.name}</p>
                          <div className="flex gap-1 mt-1">
                            {artist.genres.map((genre, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{artist.plays} plays</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="genres" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Genre Breakdown
                </CardTitle>
                <CardDescription>Your music taste by genre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockData.genres.map((genre, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{genre.name}</span>
                        <span className="text-sm text-muted-foreground">{genre.percentage}%</span>
                      </div>
                      <Progress value={genre.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
