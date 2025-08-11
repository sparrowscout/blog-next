import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'
import { CategoryList } from '@/types/postData.types'
interface CategoryFilterProps {
  categoryList: CategoryList
}

export default function CategoryFilter({
  categoryList,
}: CategoryFilterProps) {
  const {
    filter,
    filterCategory,
    removeFilterCategory,
    addFilterCategory,
    clearFilterCategory,
  } = usePostFilterStore()

  const onClickCategory = (category: string) => {
    if (categoryList.size === filterCategory?.size) {
      clearFilterCategory()
      addFilterCategory(category)
      return
    }

    if (filterCategory?.has(category)) {
      removeFilterCategory(category)
    } else addFilterCategory(category)
  }
  if (filter === FilterType.CATEGORY)
    return (
      <div className="z-10 flex w-full  flex-wrap gap-1 whitespace-nowrap px-3 pb-2">
        {Array.from(categoryList).map(
          ([category, { color, count }]) => {
            return (
              <div
                key={category}
                style={{ ['--chip' as string]: color }}
                className={`border-[1px] border-black ${filterCategory?.has(category) ? 'bg-[var(--chip)]' : 'bg-white'} flex cursor-pointer items-center justify-center px-3 py-2`}
                onClick={() => onClickCategory(category)}
              >
                {category}
                <span className="leading-2 ml-1 text-sm font-[100] !text-gray-500">
                  ({count})
                </span>
              </div>
            )
          },
        )}
      </div>
    )
}
