'use client'
import { PostComponentsProps } from '@/types/MDXComponets.types'
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import styled from 'styled-components'

interface AnchorProps extends PostComponentsProps {
  href: string
  props?: DetailedHTMLProps<
    HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
}

export default function AnchorComponent({
  href,
  children,
  props,
}: AnchorProps) {
  return (
    <Anchor {...props} href={href}>
      {children}
    </Anchor>
  )
}

const Anchor = styled.a`
  color: #8a5cf5;
  background-position: center right;
  background-repeat: no-repeat;

  background-size: 0.825em;

  cursor: pointer;
  filter: none;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    color: rgba(138, 92, 245, 0.64);
    text-decoration-line: underline;
  }
`
