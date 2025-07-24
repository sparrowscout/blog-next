import styled from 'styled-components'
import { PostComponentsProps } from '../../types/MDXComponents.Types'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

interface LIProps extends PostComponentsProps {
  props?: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
}

export default function ListItemComponent({ props }: LIProps) {
  return <ListItem {...props} />
}

const ListItem = styled.li`
  ::before {
    font-size: 0.875rem !important;
    position: absolute;
    left: -1.6em;
    color: #959396;
    content: counter(step-counter);
    counter-increment: step-counter;
  }
`
