import { ReactNode } from 'react'
import styled from 'styled-components'

interface TagProps {
  children: ReactNode
  style?: string
  size?: CardSize
  bgColor?: string
}

export type CardSize = 's' | 'm' | 'l'

export default function Tag({
  children,
  style,
  size = 'm',
  bgColor = 'white',
}: TagProps) {
  return (
    <TagContainer
      $bgColor={bgColor}
      $size={size}
      className={`${style}`}
    >
      {children}
    </TagContainer>
  )
}

const TagContainer = styled.div<{
  $bgColor: string
  $size: CardSize
}>`
  background-color: ${({ $bgColor }) => `${$bgColor}`};
  padding-inline: ${({ $size }) =>
    $size === 's'
      ? '4px'
      : $size === 'm'
        ? 'calc(var(--spacing) * 3)'
        : 'calc(var(--spacing) * 4)'};
  padding-block: ${({ $size }) =>
    $size === 's'
      ? '4px'
      : $size === 'm'
        ? 'calc(var(--spacing) * 2)'
        : 'calc(var(--spacing) * 3)'};

  font-size: ${({ $size }) =>
    $size === 's'
      ? '0.875rem'
      : $size === 'm'
        ? '1rem'
        : 'var(--text-lg)'};
  width: max-content;
  white-space: nowrap;
  justify-content: center;
  border: #000 solid 1px;

  @media screen and (max-width: 760px) {
    font-size: 0.875rem;

    font-size: ${({ $size }) =>
      $size === 's'
        ? '0.75rem'
        : $size === 'm'
          ? '0.875rem'
          : 'var(--text-lg)'};
  }
`
