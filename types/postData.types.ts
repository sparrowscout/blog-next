import { PostFrontmatter } from '@/lib/posts'

export type CategoryList = Map<
  string,
  { color: string; count: number; content: PostMeta[] }
>

export interface PostMeta extends PostFrontmatter {
  slug: string
  filePath: string
}
