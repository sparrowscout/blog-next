import { getRandomNumber2 } from '../../utils/css-utils'
import styled from 'styled-components'
import CardLabels from './CardLabels'
import { formatSmartDate } from '../../utils/formatDate'
import CategoryLabel from './CategoryLabel'
import { PostMeta } from '@/lib/posts'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Indexing from './Indexing'
import { useMediaQuery } from 'react-responsive'

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
  const [isFocusing, setIsFocusig] =
    useState<boolean>(false)
  const isMobile = useMediaQuery({
    query: '(max-width: 360px)',
  })

  useEffect(() => {
    setRotation(getRandomNumber2(3, -3))
  }, [])

  const onCardHover = () => {
    if (isMobile) return
    setIsFocusig(true)
  }

  const onCardLeave = () => {
    setIsFocusig(false)
  }

  return (
    <CardContainer>
      <Link href={`/${post.slug}`}>
        <CardWrapper
          $rotation={isFocus ? 0 : rotation}
          $translateY={
            isFocus ? translateY - 100 : translateY
          }
          className="stack-card"
        >
          {isFocusing || isFocus ? (
            <CategoryLabel
              categoryName={post.category ?? ''}
              categoryColor={categoryColor || 'transparent'}
            />
          ) : null}
          <DateTag>{formatSmartDate(post.date)}</DateTag>
          <CardLabels
            title={post.title}
            isFocusing={isFocus}
            categoryColor={categoryColor || 'transparent'}
          />

          <CardContent
            key={idx}
            data-index={idx}
            onMouseEnter={onCardHover}
            onMouseLeave={onCardLeave}
          >
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
  rotate: ${(props) => props.$rotation}deg;
  transform: translateY(0);

  @media screen and (min-width: 761px) {
    &:hover {
      transform: translateY(-100px);
      rotate: 0deg;
    }
  }

  @media screen and (max-width: 760px) {
    transform: ${({ $translateY }) =>
      `translateY(${$translateY}px)`};
    rotate: ${(props) => props.$rotation}deg;
    transition: transform 0.3s ease rotate 0.3 ease;
  }
`

const DateTag = styled.div`
  z-index: 1;
  position: absolute;
  right: 10px;
  top: -8px;
  rotate: 0deg;
  display: flex;
  width: max-content;
  padding: 4px;
  font-size: 0.75rem;
  justify-content: center;
  background-color: #fff;
  border: #000 solid 1px;
`

const CardContent = styled.div`
  position: relative;
  background: #fff;
  border: 1px solid black;
  height: 200px;
  /* filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25)); */
  position: relative;
  padding: 60px 20px 8px 20px;
  color: #5d5d5d;
  z-index: 0;
  overflow: hidden;
  box-sizing: border-box;
  @media screen and (max-width: 760px) {
    padding: 32px 16px;
    width: 100%;
    position: absolute;
  }
`
