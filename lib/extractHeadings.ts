/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'

interface Heading {
  depth: 1 | 2
  text: string
}

function extractText(node: any): string {
  if (node.type === 'text') return node.value
  if (node.children)
    return node.children.map(extractText).join('')
  return ''
}

export function extractHeadings(
  mdxSource: string,
): Heading[] {
  const tree = unified().use(remarkParse).parse(mdxSource)
  const headings: Heading[] = []
  visit(tree, 'heading', (node: any) => {
    if (node.depth === 1 || node.depth === 2) {
      const text = extractText(node)
      headings.push({ depth: node.depth, text })
    }
  })

  return headings
}
