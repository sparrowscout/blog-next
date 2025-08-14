import Notice, {
  NoticeText,
} from '@/components/common/Notice'

export default function Profile() {
  return (
    <div className="h-full w-full">
      <Notice noticeType={NoticeText.IN_PROGRESS} />
    </div>
  )
}
