import type { MDXComponents } from 'mdx/types'
import { AnchorComponent } from './components/design-system'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export const mdxComponents = {
  // Allows customizing built-in components, e.g. to add styling.
  a: ({ children, href }) => {
    return (
      <AnchorComponent href={href}>
        {children}
      </AnchorComponent>
    )
  },
} satisfies MDXComponents
