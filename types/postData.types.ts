import { PostFrontmatter } from '@/lib/posts'

export type CategoryList = Map<
  string,
  { color: string; count: number }
>

export interface PostMeta extends PostFrontmatter {
  slug: string
  filePath: string
}
