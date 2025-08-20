import ExitIcon from '@/assets/icons/exit.svg'
import TeaIcon from '@/assets/icons/cup_of_tea.svg'
import LikeIcon from '@/assets/icons/like.svg'
import { ReactElement, SVGProps } from 'react'
import IconWrapper from './IconWrapper'

export enum NoticeText {
  SEARCH_RESULT_EMPTY = '해당하는 포스트가 없네요 ~',
  FILTER_RESULT_EMPTY = '카테고리 선택을 깜박하신 것 같아요!',
  IN_PROGRESS = '페이지 준비 중 입니다!',
  CONTACT = '피드백 → 기쁘다',
}

const noticeIcon: Record<
  NoticeText,
  ReactElement<SVGProps<SVGSVGElement>>
> = {
  [NoticeText.SEARCH_RESULT_EMPTY]: <ExitIcon />,
  [NoticeText.FILTER_RESULT_EMPTY]: <ExitIcon />,
  [NoticeText.IN_PROGRESS]: <TeaIcon />,
  [NoticeText.CONTACT]: <LikeIcon />,
}
interface NoticeProps {
  noticeType: NoticeText
}

export default function Notice({
  noticeType,
}: NoticeProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex rotate-2 flex-col items-center gap-2 border-[1px] bg-white p-5 transition-all">
        <IconWrapper size="m">
          {noticeIcon[noticeType]}
        </IconWrapper>
        <div className="text-center !text-[#ff01ff]">
          {noticeType}
        </div>
      </div>
    </div>
  )
}
