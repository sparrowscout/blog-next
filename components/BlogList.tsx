'use client'
import CategoryTag from './CategoryTag'
import { formatSmartDate } from '@/utils/formatDate'
import styled from 'styled-components'
import Link from 'next/link'
import {
  CategoryList,
  PostMeta,
} from '@/types/postData.types'
import Empty from './Empty'
import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'

interface BlogListProps {
  sortedPosts: PostMeta[]
  categoryList: CategoryList
  total: number
}

export default function BlogList({
  sortedPosts,
  categoryList,
}: BlogListProps) {
  const { filter } = usePostFilterStore()
  if (sortedPosts.length === 0) {
    return <Empty />
  }

  return (
    <div className=" h-dvh overflow-y-scroll">
      <div
        className={`flex flex-col gap-2 pb-28  ${filter === FilterType.CATEGORY ? 'pt-56' : 'pt-32'} transition-all`}
      >
        {sortedPosts.map((post) => {
          const category = post.category || 'Uncategorized'

          return (
            <Link href={`/${post.slug}`} key={post.slug}>
              <div className="flex flex-col gap-2 border-[1px] border-black bg-white p-5 hover:[&_div]:!text-[#ff01ff] active:[&_div]:!text-[#ff01ff]">
                <div className="flex items-center justify-between">
                  <div className="text-lg ">
                    {post.title}
                  </div>

                  <DateTag>
                    {formatSmartDate(post.date)}
                  </DateTag>
                </div>

                <CategoryTag
                  categoryName={post.category ?? ''}
                  categoryColor={
                    categoryList.get(category)?.color ||
                    'transparent'
                  }
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
const DateTag = styled.div`
  display: flex;
  padding: 4px;
  width: max-content;
  white-space: nowrap;
  justify-content: center;
  background-color: transparent;
  border: #000 solid 1px;
`
