import { create } from 'zustand'
import usePostFilterStore, {
  FilterType,
} from './usePostFilterStore'
import { use } from 'react'

export enum BlogType {
  DEFAULT = 'default',
  CABINET = 'cabinet',
}

type BlogState = {
  blogType: BlogType
}

type BlogAction = {
  changeBlogType: (blogType: BlogType) => void
}

const useBlogTypeStore = create<BlogState & BlogAction>()(
  (set) => ({
    blogType: BlogType.DEFAULT,
    changeBlogType: (blogType: BlogType) => {
      if (blogType === BlogType.CABINET) {
        usePostFilterStore
          .getState()
          .setFilter(FilterType.CATEGORY)
      } else {
        usePostFilterStore
          .getState()
          .setFilter(FilterType.LATEST)
      }

      return set({ blogType })
    },
  }),
)

export default useBlogTypeStore
