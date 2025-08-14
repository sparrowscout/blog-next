'use client'

import { PostMeta } from '@/types/postData.types'
import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'
import BlogPost from './BlogPost'
import styled from 'styled-components'
import Notice, { NoticeText } from './common/Notice'
import { useIsIOSChrome } from '@/hooks/useIsIOSChrome'

interface BlogListProps {
  sortedPosts: PostMeta[]
  paddingValue: number
}

export default function BlogList({
  sortedPosts,
  paddingValue,
}: BlogListProps) {
  const { filter } = usePostFilterStore()
  const isCategoryFiltering = filter === FilterType.CATEGORY
  const isScrollbarOverlay = useIsIOSChrome()

  if (sortedPosts.length === 0) {
    return (
      <Notice noticeType={NoticeText.FILTER_RESULT_EMPTY} />
    )
  }

  return (
    <div
      className={`h-dvh overflow-y-scroll px-3 ${isScrollbarOverlay ? '' : 'pr-2'}`}
    >
      <BlogPostContainer
        $isCategoryFiltering={isCategoryFiltering}
        $paddingHeight={paddingValue}
      >
        {sortedPosts.map((post) => {
          return (
            <BlogPost post={post} key={post.filePath} />
          )
        })}
      </BlogPostContainer>
    </div>
  )
}

const BlogPostContainer = styled.div<{
  $paddingHeight: number
  $isCategoryFiltering: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  padding-bottom: calc(var(--spacing) * 28);
  transition: all;
  padding-top: ${({
    $paddingHeight,
    $isCategoryFiltering,
  }) =>
    $isCategoryFiltering
      ? `calc(var(--spacing) * 2 + ${$paddingHeight}px)`
      : 'calc(var(--spacing) * 32)'};
`
