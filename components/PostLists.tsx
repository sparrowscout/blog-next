'use client'
import { colorArray } from '@/app/enum/categoryColor'
import PostCardStack from './PostCardStack'
import BlogList from './BlogList'
import useBlogTypeStore, {
  BlogType,
} from '@/store/useBlogTypeStore'
import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'
import { useEffect, useRef, useState } from 'react'
import PostFiltering from './PostFiltering'
import CategoryFilter from './CategoryFilter'
import useCategoryListStore from '@/store/useCategoryListStore'
import {
  CategoryList,
  PostMeta,
} from '@/types/postData.types'

export interface CardStackProps {
  posts: PostMeta[]
}
export default function PostLists({
  posts,
}: CardStackProps) {
  const { blogType } = useBlogTypeStore()
  const { filter, filterCategory } = usePostFilterStore()
  const categoryList: CategoryList = new Map()
  const { categoryList: categorySet, setCategoryList } =
    useCategoryListStore()
  const [postArray, setPostArray] =
    useState<PostMeta[]>(posts)
  const [categoryFilterHeight, setCategoryFilterHeight] =
    useState<number>(0)
  const [width, setWidth] = useState(0)

  const categoryFilterRef = useRef<null | HTMLDivElement>(
    null,
  )

  const categoryMap = new Map<string, PostMeta[]>()

  posts.forEach((post, index) => {
    const category = post.category || 'Uncategorized'
    const hasCategory = categoryList.get(category)
    if (!categoryList.has(category)) {
      categoryList.set(category, {
        color: colorArray[index],
        count: 1,
        content: [post],
      })
    } else if (hasCategory) {
      categoryList.set(category, {
        ...hasCategory,
        count: hasCategory.count + 1,
        content: [...hasCategory.content, post],
      })
    }

    if (!categoryMap.has(category)) {
      categoryMap.set(category, [])
    }

    categoryMap.get(category)?.push(post)
  })

  if (categorySet.size === 0) {
    setCategoryList(categoryList)
  }

  const sortedCategoryKeys = [...categoryMap.keys()].sort()

  const sortedPosts = sortedCategoryKeys.flatMap(
    (key) => categoryMap.get(key)!,
  )

  const latestPostArray = [...sortedPosts].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime(),
  )

  const oldestPostArray = [...sortedPosts].sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime(),
  )

  const categoryFilterdPostArray = [...sortedPosts].filter(
    (post) => {
      return filterCategory?.has(
        post.category || 'Uncategorized',
      )
    },
  )

  useEffect(() => {
    if (filter === FilterType.LATEST) {
      setPostArray(latestPostArray)
    } else if (filter === FilterType.OLDEST) {
      setPostArray(oldestPostArray)
    } else if (filter === FilterType.CATEGORY) {
      setPostArray(categoryFilterdPostArray)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, filterCategory])

  useEffect(() => {
    if (filter !== FilterType.CATEGORY) return

    const el = categoryFilterRef.current
    if (!el) return

    setCategoryFilterHeight(el.clientHeight)
  }, [filter, width])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <div className="absolute left-1/2 top-20 z-[15] flex -translate-x-1/2 px-3 py-2">
        <PostFiltering />
      </div>
      <div
        className="absolute z-10 pt-32"
        ref={categoryFilterRef}
      >
        <CategoryFilter categoryList={categoryList} />
      </div>

      {blogType === BlogType.CABINET ? (
        <PostCardStack
          sortedPosts={postArray}
          categoryList={categoryList}
          paddingValue={categoryFilterHeight}
        />
      ) : (
        <BlogList
          sortedPosts={postArray}
          paddingValue={categoryFilterHeight}
        />
      )}
    </>
  )
}
