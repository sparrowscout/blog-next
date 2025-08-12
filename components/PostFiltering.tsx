import usePostFilterStore, {
  FilterLabel,
  FilterType,
} from '@/store/usePostFilterStore'
import ArrowIcon from '@/assets/icons/left-arrow.svg'
import { useState } from 'react'
import IconWrapper from './common/IconWrapper'

export default function PostFiltering() {
  const { filter, setFilter } = usePostFilterStore()
  const [openDropDown, setOpenDropDown] =
    useState<boolean>(false)

  const onClickFilter = (filterType: FilterType) => {
    setFilter(filterType)
    setOpenDropDown(false)
  }

  const onClickDropDown = () => {
    setOpenDropDown((prev) => !prev)
  }

  return (
    <div className="flex flex-col">
      <div
        className="flex w-fit cursor-pointer items-center justify-center border-[1px] border-black bg-white px-5 pr-2"
        onClick={onClickDropDown}
      >
        {FilterLabel[filter]}
        <IconWrapper size="m">
          <ArrowIcon
            style={{
              rotate: `${openDropDown ? '-90deg' : '90deg'}`,
              transition: 'rotate 0.3s ease',
            }}
          />
        </IconWrapper>
      </div>
      <div
        className={`absoulte  border-x-[1px] border-black text-center ${openDropDown ? 'h-full' : 'h-0'} overflow-hidden bg-white transition-all duration-300 ease-in-out`}
      >
        {Array.from(Object.entries(FilterLabel)).map(
          (item) => {
            return (
              <div
                key={item[0]}
                onClick={() => {
                  onClickFilter(item[0] as FilterType)
                }}
                className={`z-10 cursor-pointer border-b-[1px] border-black bg-white px-2 py-1 text-center hover:text-[#ff01ff] active:text-[#ff01ff]  ${item[0] === filter ? 'font-semibold !text-[#ff01ff]' : ''} `}
              >
                {item[1]}
              </div>
            )
          },
        )}
      </div>
    </div>
  )
}
