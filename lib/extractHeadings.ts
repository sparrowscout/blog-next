/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'

interface Heading {
  depth: 1 | 2
  text: string
}

export function extractHeadings(
  mdxSource: string,
): Heading[] {
  const tree = unified().use(remarkParse).parse(mdxSource)
  const headings: Heading[] = []

  visit(tree, 'heading', (node: any) => {
    if (node.depth === 1 || node.depth === 2) {
      const text = node.children
        .map((child: any) => child.value)
        .join('')
      headings.push({ depth: node.depth, text })
    }
  })

  return headings
}
