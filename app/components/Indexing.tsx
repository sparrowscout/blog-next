import { Heading } from '@/lib/posts'
import styled from 'styled-components'

interface IndexingProps {
  heading: Heading[]
}

export default function Indexing({
  heading,
}: IndexingProps) {
  let firstDepth = 0
  let secondDepth = 0

  return (
    <ol>
      {heading.map((item: Heading, index) => {
        if (item.depth === 1) firstDepth++
        if (item.depth === 2) secondDepth++

        const prefix =
          item.depth === 1
            ? `${firstDepth}.`
            : `${firstDepth}-${secondDepth}.`

        return (
          <NumberedList
            key={index}
            $isIndent={item.depth === 2}
          >
            {prefix} {item.text}
          </NumberedList>
        )
      })}
    </ol>
  )
}

const NumberedList = styled.li<{ $isIndent: boolean }>`
  padding-left: ${({ $isIndent }) =>
    $isIndent ? '8px' : '0px'};
`
