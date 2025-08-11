import { CategoryList } from '@/types/postData.types'
import { create } from 'zustand'

type CategoryListState = {
  categoryList: CategoryList
}

type CategoryListAction = {
  setCategoryList: (categoryList: CategoryList) => void
}

const useCategoryListStore = create<
  CategoryListState & CategoryListAction
>()((set) => ({
  categoryList: new Map(),
  setCategoryList: (categoryList: CategoryList) => {
    set({ categoryList })
  },
}))

export default useCategoryListStore
