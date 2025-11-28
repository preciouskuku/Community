"use client"

import { usePostsStore } from "@/state/postsStore"
import { useEventsStore } from "@/state/eventsStore"

export function ActivityFeed() {
  const { posts } = usePostsStore()
  const { events } = useEventsStore()

  const recentActivity = [
    ...posts.slice(0, 2).map((post) => ({
      id: post.id,
      type: "post" as const,
      user: post.author,
      action: "created a post",
      title: post.title,
      time: post.date,
    })),
    ...events.slice(0, 2).map((event) => ({
      id: event.id,
      type: "event" as const,
      user: "Community",
      action: "created an event",
      title: event.title,
      time: event.date,
    })),
  ].sort((a, b) => {
    const timeMap = { "just now": 0, "2 hours ago": 2, "5 hours ago": 5, "1 day ago": 24 }
    return (timeMap[a.time as keyof typeof timeMap] || 0) - (timeMap[b.time as keyof typeof timeMap] || 0)
  })

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Activity Feed</h2>
      <div className="space-y-3">
        {recentActivity.map((activity) => (
          <div
            key={`${activity.type}-${activity.id}`}
            className="flex gap-3 p-3 rounded-lg border border-border bg-card/50"
          >
            <div className="text-2xl">{activity.type === "post" ? "📝" : "📅"}</div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-sm font-medium mt-1">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
