import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import { remarkMark } from 'remark-mark-highlight'
import rehypePrism from 'rehype-prism-plus'
import nextConfig from './next.config'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMark],
    rehypePlugins: [[rehypePrism,{ showLineNumbers: true, ignoreMissing: true }]],
  },
})

export default withMDX(nextConfig)
