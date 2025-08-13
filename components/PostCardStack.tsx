'use client'
import Card from './Card'
import { useMediaQuery } from 'react-responsive'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CategoryList,
  PostMeta,
} from '@/types/postData.types'
import Empty from './Empty'
import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'

interface PostCardStackProps {
  sortedPosts: PostMeta[]
  categoryList: CategoryList
  total: number
}

export default function PostCardStack({
  sortedPosts,
  categoryList,
  total,
}: PostCardStackProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [touchList, setTouchList] = useState<number[]>([])
  const [postsGap, setPostsGap] = useState<number>()
  const containerRef = useRef<null | HTMLDivElement>(null)
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 760px)',
  })
  const { filter } = usePostFilterStore()

  const getPostsGap = () => {
    if (!containerRef.current) return

    const { clientHeight } = containerRef.current
    setPostsGap((clientHeight - 200) / total)
  }

  const onContainerTouchStart = (
    event: React.TouchEvent,
  ) => {
    const { touches } = event
    setTouchList([touches[0].clientY])
  }

  useEffect(() => {
    getPostsGap()
  }, [])

  const onContainerTouchMove = (
    event: React.TouchEvent,
  ) => {
    const { touches } = event
    const currentY = touches[0].clientY
    setTouchList((prev) => [...prev, currentY])

    const firstThumb = touchList[0]
    const distance = currentY - firstThumb
    const dragThreshold = 5

    if (Math.abs(distance) > dragThreshold) {
      if (distance < 0) {
        setCurrentIdx((prev) =>
          Math.min(prev + 1, total - 1),
        )
      } else if (distance > 0) {
        setCurrentIdx((prev) => Math.max(prev - 1, 0))
      }
      setTouchList([])
    }
  }

  const onContainerTouchEnd = () => {
    setTouchList([])
  }

  const onContainerWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setCurrentIdx((prev) => Math.min(prev + 1, total - 1))
    } else {
      setCurrentIdx((prev) => Math.max(prev - 1, 0))
    }
  }

  if (sortedPosts.length === 0) {
    return (
      <Empty guideText="카테고리 선택을 깜박하신 것 같아요!" />
    )
  }

  return (
    <Container
      onWheel={onContainerWheel}
      onTouchStart={onContainerTouchStart}
      onTouchMove={onContainerTouchMove}
      onTouchEnd={onContainerTouchEnd}
      ref={containerRef}
      $isCategoryFilter={filter === FilterType.CATEGORY}
    >
      {sortedPosts.map((post, idx) => {
        const offset = idx * (postsGap ?? 0) // 카드 간 간격
        const isFocus = isTabletOrMobile
          ? idx === currentIdx
          : false
        const category = post.category || 'Uncategorized'

        return (
          <Card
            post={post}
            idx={idx}
            translateY={offset}
            isFocus={isFocus}
            categoryColor={
              categoryList.get(category)?.color
            }
            key={post.slug}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div<{
  $isCategoryFilter: boolean
}>`
  padding-top: ${({ $isCategoryFilter }) =>
    $isCategoryFilter ? '400px' : '300px'};
  max-width: 90%;
  margin: auto;
  touch-action: none;
  height: 100%;

  @media screen and (max-width: 760px) {
    padding: 0px 8px;
    padding-top: ${({ $isCategoryFilter }) =>
      $isCategoryFilter ? '350px' : '240px'};

    overflow: hidden;
    max-width: 100%;
    position: relative;
  }
`
