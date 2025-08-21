'use client'
import { PostComponentsProps } from '@/types/MDXComponets.types'
import React, {
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react'
import styled from 'styled-components'

interface OLProps extends PostComponentsProps {
  props?: DetailedHTMLProps<
    HTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >
  // Add any other props you expect to pass to the blockquote
}

export default function OrderedListComponent({
  props,
  children,
}: OLProps) {
  return <OrderedList {...props}>{children}</OrderedList>
}

const OrderedList = styled.ol`
  list-style-type: none; // 기본 숫자 숨기기
  counter-reset: step-counter;

  padding-left: 1.25rem; // 숫자 들어갈 공간 확보

  & > li {
    position: relative; // ::before 위치 기준
    padding-left: 1.5em; // 텍스트 들여쓰기

    &::before {
      content: counter(step-counter) '.';
      counter-increment: step-counter;

      position: absolute;
      left: 0; // li 기준으로 왼쪽 정렬
      top: 0;
      color: #959396;
    }
  }
`
