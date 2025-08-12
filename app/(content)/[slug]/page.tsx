import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkMark } from 'remark-mark-highlight'
import rehypePrism from 'rehype-prism-plus'
import fs from 'node:fs/promises'
import { mdxComponents } from '@/mdx-components'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = await getPostBySlug(slug)

  if (!meta) return <div>Not Found</div>

  const source = await fs.readFile(meta.filePath, 'utf-8')

  const { content, frontmatter } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMark],
        rehypePlugins: [
          [
            rehypePrism,
            { showLineNumbers: true, ignoreMissing: true },
          ],
        ],
      },
    },
  })

  return (
    <div className="h-dvh select-text overflow-scroll pb-36 pt-24 md:px-5">
      <article className=" box-border border-[1px] border-gray-900 bg-white p-4">
        <h1>
          {String(
            frontmatter?.title ?? meta.title ?? meta.slug,
          )}
        </h1>
        {content}
      </article>
    </div>
  )
}
