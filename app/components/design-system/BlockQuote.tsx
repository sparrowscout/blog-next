import styled from 'styled-components'
import { PostComponentsProps } from '../../types/MDXComponents.Types'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

interface BlockQuoteProps extends PostComponentsProps {
  props?: DetailedHTMLProps<HTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
  // Add any other props you expect to pass to the blockquote
}

export default function BlockQuoteComponent(props: BlockQuoteProps) {
  return <BlockQuote {...props} />
}

const BlockQuote = styled.blockquote`
  color: inherit;
  font-style: normal;
  background-color: transparent;
  border-inline-start: 2px solid #28bfdd;
  padding-top: 0;
  padding-bottom: 0;
  padding-inline-start: 24px;
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;

  & > p {
    margin: 0;
  }
`
