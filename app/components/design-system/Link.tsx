import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { PostComponentsProps } from '../../types/MDXComponents.Types'
import styled from 'styled-components'

interface AnchorProps extends PostComponentsProps {
  props?: DetailedHTMLProps<
    HTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
}

export default function AnchorComponent({ props, children }: AnchorProps) {
  return <Anchor {...props}>{children}</Anchor>
}

const Anchor = styled.a`
  color: #8a5cf5;
  background-position: center right;
  background-repeat: no-repeat;
  background-image:
    linear-gradient(transparent, transparent), url('/icons/anchor.svg');
  background-size: 0.825em;
  padding-inline-end: 0.9em;
  cursor: pointer;
  filter: none;
  transition: opacity 0.15s ease-in-out;

  &:hover {
    color: rgba(138, 92, 245, 0.64);
    text-decoration-line: underline;
  }
`
