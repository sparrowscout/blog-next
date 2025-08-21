import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkMark } from 'remark-mark-highlight'
import rehypePrism from 'rehype-prism-plus'
import fs from 'node:fs/promises'
import { mdxComponents } from '@/mdx-components'
import ClientScrollContainer from '@/components/common/ClientScrollContainer'
import { formatDate } from 'date-fns'

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
    <ClientScrollContainer className="h-dvh select-text overflow-scroll px-3 pb-36 pt-32 !leading-relaxed">
      <article className="m-auto box-border max-w-[1280px] border-[1px] border-gray-900 bg-white p-4">
        <div>{meta.category} /</div>

        <h1>
          {String(
            frontmatter?.title ?? meta.title ?? meta.slug,
          )}
        </h1>
        <div className="text-end text-sm">
          {formatDate(meta.date, 'yyyy/MM/dd')}
        </div>
        <hr className="!mb-12" />
        {content}
      </article>
    </ClientScrollContainer>
  )
}
