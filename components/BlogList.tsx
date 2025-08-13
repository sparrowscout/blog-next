'use client'

import { PostMeta } from '@/types/postData.types'
import Empty from './Empty'
import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'
import BlogPost from './BlogPost'

interface BlogListProps {
  sortedPosts: PostMeta[]
  total: number
}

export default function BlogList({
  sortedPosts,
}: BlogListProps) {
  const { filter } = usePostFilterStore()
  if (sortedPosts.length === 0) {
    return (
      <Empty guideText="카테고리 선택을 깜박하신 것 같아요!" />
    )
  }

  return (
    <div className=" h-dvh overflow-y-scroll pl-3 pr-2">
      <div
        className={`flex flex-col gap-2 pb-28  ${filter === FilterType.CATEGORY ? 'pt-56' : 'pt-32'} transition-all`}
      >
        {sortedPosts.map((post) => {
          return (
            <BlogPost post={post} key={post.filePath} />
          )
        })}
      </div>
    </div>
  )
}
