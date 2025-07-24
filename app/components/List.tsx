import { getAllPosts } from '@/lib/posts'
import CardStack from './CardStack'

export default async function List() {
  const posts = await getAllPosts()
  return <CardStack posts={posts} />
}
