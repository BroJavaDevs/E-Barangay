import { db } from "@/drizzle/db"
import { announcement } from "@/drizzle/migrations/schema"

export const addPost = async () => {
  await db.insert(announcement).values({
    title: 'New Announcement',
    body: 'This is a new announcement',
  })
}