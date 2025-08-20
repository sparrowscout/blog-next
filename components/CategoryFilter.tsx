import usePostFilterStore, {
  FilterType,
} from '@/store/usePostFilterStore'
import { CategoryList } from '@/types/postData.types'
import Tag from './common/Tag'
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
                onClick={() => onClickCategory(category)}
                key={category}
                className="cursor-pointer"
              >
                <Tag
                  bgColor={
                    filterCategory?.has(category)
                      ? color
                      : 'white'
                  }
                >
                  {category}
                  <span className="leading-2 ml-1 text-sm font-[100] !text-gray-500">
                    ({count})
                  </span>
                </Tag>
              </div>
            )
          },
        )}
      </div>
    )
}
