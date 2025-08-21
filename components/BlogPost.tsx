import { PostMeta } from '@/types/postData.types'
import Link from 'next/link'
import CategoryTag from './CategoryTag'
import { formatSmartDate } from '@/utils/formatDate'
import useCategoryListStore from '@/store/useCategoryListStore'
import useSearchStore from '@/store/useSearchStore'
import Tag from './common/Tag'

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
        <div className="flex items-start justify-between">
          <div className="text-lg">{post.title}</div>
          <Tag size="s">{formatSmartDate(post.date)}</Tag>
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
