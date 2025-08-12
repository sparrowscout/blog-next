import PostLists from '@/components/PostLists'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="h-full w-full">
      <PostLists posts={posts} />
    </div>
  )
}
