/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

export function mdxToText(mdx: string) {
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .parse(mdx)

  // code/inlineCode는 검색 노이즈라 제거
  visit(
    tree,
    (node: any, _i: number | undefined, parent: any) => {
      if (
        node.type === 'code' ||
        node.type === 'inlineCode'
      ) {
        if (parent?.children)
          parent.children = parent.children.filter(
            (c: any) => c !== node,
          )
      }
    },
  )

  const chunks: string[] = []
  visit(tree, 'text', (node: any) =>
    chunks.push(String(node.value)),
  )
  return chunks.join(' ').replace(/\s+/g, ' ').trim()
}
