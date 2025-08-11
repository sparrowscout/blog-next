import { create } from 'zustand'
import useCategoryListStore from './useCategoryListStore'

export enum FilterType {
  LATEST = 'latest',
  OLDEST = 'oldest',
  CATEGORY = 'category',
}

enum FilterKR {
  LATEST = '최신순',
  OLDEST = '오래된순',
  CATEGORY = '카테고리',
}

export const FilterLabel: Record<FilterType, FilterKR> = {
  [FilterType.LATEST]: FilterKR.LATEST,
  [FilterType.OLDEST]: FilterKR.OLDEST,
  [FilterType.CATEGORY]: FilterKR.CATEGORY,
}

type FilterState = {
  filter: FilterType
  filterCategory?: Set<string>
}

type FilterAction = {
  setFilter: (filter: FilterType) => void
  addFilterCategory: (category: string) => void
  removeFilterCategory: (category: string) => void
  clearFilterCategory: () => void
}

const usePostFilterStore = create<
  FilterState & FilterAction
>()((set) => ({
  filter: FilterType.LATEST,
  filterCategory: new Set<string>(),
  setFilter: (filter: FilterType) => {
    if (filter === FilterType.CATEGORY) {
      const newSet = new Set<string>()
      useCategoryListStore
        .getState()
        .categoryList.keys()
        .forEach((category) => {
          newSet.add(category)
        })

      set({ filterCategory: newSet })
    }

    return set({ filter })
  },
  addFilterCategory: (category: string) =>
    set((state) => {
      const newCategory = new Set(state.filterCategory)
      newCategory.add(category)
      return { filterCategory: newCategory }
    }),
  removeFilterCategory: (category: string) =>
    set((state) => {
      const newCategory = new Set(state.filterCategory)
      newCategory.delete(category)
      return { filterCategory: newCategory }
    }),
  clearFilterCategory: () =>
    set(() => ({ filterCategory: new Set<string>() })),
}))

export default usePostFilterStore
