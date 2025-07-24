'use client'
import Card from './Card'
import { useMediaQuery } from 'react-responsive'
import { PostMeta } from '@/lib/posts'
import { useEffect, useRef, useState } from 'react'
import { colorArray } from '../enum/categoryColor'
import styled from 'styled-components'

interface CardStackProps {
  posts: PostMeta[]
}

export default function CardStack({
  posts,
}: CardStackProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [touchList, setTouchList] = useState<number[]>([])
  const [postsGap, setPostsGap] = useState<number>()
  const containerRef = useRef<null | HTMLDivElement>(null)
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 760px)',
  })

  const categoryList = new Map<string, string>()

  const categoryMap = new Map<string, PostMeta[]>()

  posts.forEach((post, index) => {
    const category = post.category || 'Uncategorized'
    if (!categoryList.has(category)) {
      categoryList.set(category, colorArray[index])
    }

    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }

    categoryMap.get(category)?.push(post)
  })

  const sortedCategoryKeys = [...categoryMap.keys()].sort()

  const sortedPosts = sortedCategoryKeys.flatMap(
    (key) => categoryMap.get(key)!,
  )

  const total = posts.length

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

  return (
    <Container
      onWheel={onContainerWheel}
      onTouchStart={onContainerTouchStart}
      onTouchMove={onContainerTouchMove}
      onTouchEnd={onContainerTouchEnd}
      ref={containerRef}
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
            categoryColor={categoryList.get(category)}
            key={post.slug}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  padding: 350px 16px 200px 16px;
  max-width: 90%;
  margin: auto;
  touch-action: none;
  height: 100%;

  @media screen and (max-width: 760px) {
    padding: 0px 8px;
    overflow: hidden;
    max-width: 100%;
    position: relative;
    padding-top: 160px;
  }
`
