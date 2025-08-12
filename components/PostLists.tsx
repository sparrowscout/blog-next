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
import { useEffect, useState } from 'react'
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

  const total = posts.length

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
  }, [filter, filterCategory])

  return (
    <>
      <div className="absolute left-1/2 top-20 z-10 flex -translate-x-1/2 px-3 py-2">
        <PostFiltering />
      </div>
      <div className="absolute pt-32">
        <CategoryFilter categoryList={categoryList} />
      </div>

      {blogType === BlogType.CABINET ? (
        <PostCardStack
          total={total}
          sortedPosts={postArray}
          categoryList={categoryList}
        />
      ) : (
        <BlogList
          total={total}
          sortedPosts={postArray}
          categoryList={categoryList}
        />
      )}
    </>
  )
}
