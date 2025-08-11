import { getAllPosts } from '@/lib/posts'
import PostLists from './PostLists'

export default async function List() {
  const posts = await getAllPosts()
  return <PostLists posts={posts} />
}
