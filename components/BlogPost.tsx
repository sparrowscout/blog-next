import { PostMeta } from '@/types/postData.types'
import Link from 'next/link'
import styled from 'styled-components'
import CategoryTag from './CategoryTag'
import { formatSmartDate } from '@/utils/formatDate'
import useCategoryListStore from '@/store/useCategoryListStore'
import useSearchStore from '@/store/useSearchStore'

interface BlogPostProps {
  post: PostMeta
}

export default function BlogPost({ post }: BlogPostProps) {
  const { categoryList } = useCategoryListStore()
  const { isSearching, closeSearchScreen } =
    useSearchStore()
  const category = post.category || 'Uncategorized'

  const onClickPost = () => {
    if (isSearching) closeSearchScreen()
  }

  return (
    <Link
      href={`/${post.slug}`}
      onClick={() => onClickPost()}
      key={post.slug}
    >
      <div className="flex flex-col gap-2 border-[1px] border-black bg-white p-5 hover:[&_div]:!text-[#ff01ff] active:[&_div]:!text-[#ff01ff]">
        <div className="flex items-center justify-between">
          <div className="text-lg ">{post.title}</div>

          <DateTag>{formatSmartDate(post.date)}</DateTag>
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
