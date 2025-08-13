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
  paddingValue: number
}

export default function PostCardStack({
  sortedPosts,
  categoryList,
  total,
  paddingValue,
}: PostCardStackProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [touchList, setTouchList] = useState<number[]>([])
  const containerRef = useRef<null | HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 760px)',
  })
  const { filter } = usePostFilterStore()

  useEffect(() => {
    setCurrentIdx(0)
    scrollToTop()
  }, [sortedPosts])

  const CARD_GAP = 60
  const SCROLL_STEP = 30

  const bumpScroll = (direction: 'up' | 'down') => {
    const el = containerRef.current
    if (!el) return
    const dy =
      direction === 'down' ? SCROLL_STEP : -SCROLL_STEP
    el.scrollBy({ top: dy, behavior: 'smooth' })
  }

  const scrollToTop = () => {
    const el = containerRef.current
    if (!el) return

    el.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  const setIndexAndScroll = (
    next: number,
    dir: 'up' | 'down',
  ) => {
    setCurrentIdx(next)
    const isEdge =
      next === 0 || next === sortedPosts.length - 1

    if (isEdge) {
      scrollToEnd(next)
    } else {
      bumpScroll(dir)
    }
  }

  const scrollToEnd = (index: number) => {
    const el = containerRef.current
    if (!el) return

    if (index === 0) {
      el.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
    } else if (index === sortedPosts.length - 1) {
      el.scrollTo({
        behavior: 'smooth',
        top: el.scrollHeight,
      })
    }
  }

  const onContainerTouchStart = (
    event: React.TouchEvent,
  ) => {
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
    const dragThreshold = 5

    if (Math.abs(distance) > dragThreshold) {
      if (distance < 0) {
        setCurrentIdx((prev) => {
          const next = Math.min(prev + 1, total - 1)
          if (next !== prev) setIndexAndScroll(next, 'down')
          return next
        })
      } else if (distance > 0) {
        setCurrentIdx((prev) => {
          const next = Math.max(prev - 1, 0)
          if (next !== prev) setIndexAndScroll(next, 'up')
          return next
        })
      }
      setTouchList([])
    }
  }

  const onContainerTouchEnd = () => {
    setTouchList([])
  }

  const onContainerWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setCurrentIdx((prev) => {
        const next = Math.min(prev + 1, total - 1)
        if (next !== prev) setIndexAndScroll(next, 'down')
        return next
      })
    } else {
      setCurrentIdx((prev) => {
        const next = Math.max(prev - 1, 0)
        if (next !== prev) setIndexAndScroll(next, 'up')
        return next
      })
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
      $isCategoryFiltering={filter === FilterType.CATEGORY}
      $paddingHeight={paddingValue}
    >
      {sortedPosts.map((post, idx) => {
        const offset = idx * CARD_GAP
        const isFocus = isTabletOrMobile
          ? idx === currentIdx
          : false
        const category = post.category || 'Uncategorized'

        return (
          <div
            key={post.slug}
            style={{
              // (선택) 스냅 대상
              scrollSnapAlign: 'start',
            }}
            ref={(el) => {
              cardRefs.current[idx] = el
            }}
          >
            <Card
              post={post}
              idx={idx}
              translateY={offset}
              isFocus={isFocus}
              categoryColor={
                categoryList.get(category)?.color
              }
            />
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div<{
  $isCategoryFiltering: boolean
  $paddingHeight: number
}>`
  padding-top: ${({
    $paddingHeight,
    $isCategoryFiltering,
  }) =>
    $isCategoryFiltering
      ? `calc(var(--spacing) * 80 + ${$paddingHeight}px)`
      : 'calc(var(--spacing) * 100)'};
  max-width: 90%;
  margin: auto;
  touch-action: none;
  height: 100%;

  @media screen and (max-width: 760px) {
    padding: 0px 8px;
    padding-top: ${({
      $paddingHeight,
      $isCategoryFiltering,
    }) =>
      $isCategoryFiltering
        ? `calc(var(--spacing) * 45 + ${$paddingHeight}px)`
        : 'calc(var(--spacing) * 80)'};

    max-width: 100%;
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    touch-action: pan-y;
  }
`
