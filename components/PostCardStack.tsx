'use client'

import Card from './Card'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  CategoryList,
  PostMeta,
} from '@/types/postData.types'
import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'
import Notice, { NoticeText } from './common/Notice'
import { checkPC } from '@/utils/os'

interface PostCardStackProps {
  sortedPosts: PostMeta[]
  categoryList: CategoryList
  paddingValue: number
}

export default function PostCardStack({
  sortedPosts,
  categoryList,
  paddingValue,
}: PostCardStackProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [touchList, setTouchList] = useState<number[]>([])
  const containerRef = useRef<null | HTMLDivElement>(null)
  const isPC = checkPC()

  const { filter } = usePostFilterStore()

  useEffect(() => {
    setCurrentIdx(0)
    scrollToTop()
  }, [sortedPosts])

  const scrollToTop = () => {
    const el = containerRef.current
    if (!el) return

    el.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  const onContainerTouchStart = (
    event: React.TouchEvent,
  ) => {
    if (isPC) return

    const { touches } = event
    setTouchList([touches[0].clientY])
  }

  const onContainerTouchMove = (
    event: React.TouchEvent,
  ) => {
    const { touches } = event
    const currentY = touches[0].clientY
    setTouchList((prev) => [...prev, currentY])

    const firstThumb = touchList[0]
    const distance = currentY - firstThumb
    const dragThreshold = 20

    if (Math.abs(distance) > dragThreshold) {
      if (distance < 0) {
        setCurrentIdx((prev) =>
          Math.min(prev + 1, sortedPosts.length - 1),
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
      setCurrentIdx((prev) =>
        Math.min(prev + 1, sortedPosts.length - 1),
      )
    } else {
      setCurrentIdx((prev) => Math.max(prev - 1, 0))
    }
  }

  if (sortedPosts.length === 0) {
    return (
      <Notice noticeType={NoticeText.FILTER_RESULT_EMPTY} />
    )
  }

  return (
    <Container
      onWheel={onContainerWheel}
      onTouchStart={onContainerTouchStart}
      onTouchMove={onContainerTouchMove}
      onTouchEnd={onContainerTouchEnd}
      ref={containerRef}
      $isCategoryFiltering={filter === FilterType.CATEGORY}
      $paddingHeight={paddingValue}
    >
      {sortedPosts.map((post, idx) => {
        const isFocus = idx === currentIdx
        const CARD_GAP = 50

        const offset = isFocus
          ? -100
          : CARD_GAP * (idx - currentIdx)

        const category = post.category || 'Uncategorized'

        return (
          <Card
            key={post.slug}
            post={post}
            idx={idx}
            translateY={offset}
            isFocus={isFocus}
            categoryColor={
              categoryList.get(category)?.color
            }
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div<{
  $isCategoryFiltering: boolean
  $paddingHeight: number
}>`
  padding: 0px 32px;
  padding-top: ${({
    $paddingHeight,
    $isCategoryFiltering,
  }) =>
    $isCategoryFiltering
      ? `calc(var(--spacing) * 80 + ${$paddingHeight}px)`
      : 'calc(var(--spacing) * 100)'};
  max-width: 1280px;

  margin: auto;
  touch-action: none;
  height: 100%;

  @media screen and (max-width: 760px) {
    padding: 0px 12px;
    padding-top: ${({
      $paddingHeight,
      $isCategoryFiltering,
    }) =>
      $isCategoryFiltering
        ? `calc(var(--spacing) * 48 + ${$paddingHeight}px)`
        : 'calc(var(--spacing) * 80)'};

    width: 100%;
    position: relative;
    overflow: hidden;
  }
`
