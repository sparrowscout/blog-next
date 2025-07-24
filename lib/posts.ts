import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import fg from 'fast-glob'
import { extractHeadings } from './extractHeadings'

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  headings: Heading[]
  slug?: string
  category?: string
  tags?: string[]
}

export interface Heading {
  depth: number
  text: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  filePath: string
}

// const BLOG_DIR = path.join(process.cwd(), 'content');

const CONTENT_DIR = (() => {
  const p = path.join(process.cwd(), 'app', '(content)')

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('node:fs').accessSync(p)
    return p
  } catch {
    return path.join(process.cwd(), 'app', 'content')
  }
})()

export async function getPostFilePath(): Promise<string[]> {
  return fg(['**/*.md', '**/*.mdx'], {
    cwd: CONTENT_DIR,
    absolute: true,
  })
}

export async function parsePost(
  filePath: string,
): Promise<PostMeta> {
  const source = await fs.readFile(filePath, 'utf-8')
  const { data, content } = matter(source)
  const fm = data as PostFrontmatter

  // index
  const headings = extractHeadings(content)

  // slug 결정
  const rel = path.relative(CONTENT_DIR, filePath)
  const base = rel
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/i, '')
  const slugFromFile = base.split('/').pop()!
  const slug = (fm.slug ?? slugFromFile).replace(
    /^\d{4}-\d{2}-\d{2}-/,
    '',
  )

  //category
  const categoryMatch = rel.match(/^(.*?)\//)
  const category = categoryMatch
    ? categoryMatch[1]
    : undefined

  return {
    ...fm,
    slug,
    category,
    filePath,
    headings,
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await getPostFilePath()
  const posts = await Promise.all(files.map(parsePost))

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(
  slug: string,
): Promise<PostMeta | undefined> {
  const posts = await getAllPosts()
  return posts.find((p) => p.slug === slug)
}
