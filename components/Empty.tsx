import ExitIcon from '@/assets/icons/exit.svg'

export default function Empty() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex rotate-2 flex-col items-center gap-2 border-[1px] bg-white p-5">
        <ExitIcon
          width={24}
          height={24}
          style={{ fill: '#ff01ff' }}
        />
        <div className="text-center !text-[#ff01ff]">
          카테고리 선택을 깜박하신 것 같아요!
        </div>
      </div>
    </div>
  )
}
