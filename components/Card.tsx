import { getRandomNumber2 } from '../utils/css-utils'
import styled from 'styled-components'
import CardLabels from './CardLabels'
import { formatSmartDate } from '../utils/formatDate'
import CategoryLabel from './CategoryLabel'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Indexing from './Indexing'
import { PostMeta } from '@/types/postData.types'
import Tag from './common/Tag'

interface CardProps {
  post: PostMeta
  idx: number
  translateY: number
  isFocus: boolean
  categoryColor?: string
}

export default function Card({
  post,
  idx,
  translateY,
  isFocus,
  categoryColor,
}: CardProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setRotation(getRandomNumber2(3, -3))
  }, [])

  return (
    <CardContainer>
      <Link href={`/${post.slug}`}>
        <CardWrapper
          $rotation={isFocus ? 0 : rotation}
          $translateY={translateY}
          className="stack-card"
        >
          {isFocus ? (
            <CategoryLabel
              categoryName={post.category ?? ''}
              categoryColor={categoryColor || 'transparent'}
            />
          ) : null}
          <DateTag>
            <Tag size="s">{formatSmartDate(post.date)}</Tag>
          </DateTag>
          <CardLabels
            title={post.title}
            isFocusing={isFocus}
            categoryColor={categoryColor || 'transparent'}
          />
          <CardContent key={idx} data-index={idx}>
            <div className="pb-2">{post.excerpt}</div>
            <Indexing heading={post.headings} />
          </CardContent>
        </CardWrapper>
      </Link>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  margin-top: -150px;
  cursor: pointer;

  @media screen and (max-width: 760px) {
    margin-top: 0px;
  }
`

const CardWrapper = styled.div<{
  $rotation: number
  $translateY: number
}>`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition:
    transform 0.1s ease,
    rotate 0.1s ease-out;
  rotate: ${({ $rotation }) => `${$rotation}deg`};
  transform: ${({ $translateY }) =>
    `translateY(${$translateY}px)`};
`

const DateTag = styled.div`
  z-index: 1;
  position: absolute;
  right: 10px;
  top: -8px;
`

const CardContent = styled.div`
  background: #fff;
  border: 1px solid black;
  height: 200px;
  width: 100%;
  position: absolute;
  padding: 60px 20px 8px 20px;
  color: #5d5d5d;
  z-index: 0;
  overflow: hidden;
  box-sizing: border-box;

  @media screen and (max-width: 760px) {
    padding: 32px 16px;
  }
`
