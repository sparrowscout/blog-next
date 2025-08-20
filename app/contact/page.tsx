'use client'

import Tag from '@/components/common/Tag'
import BugReportIcon from '@/assets/icons/bug_report.svg'
import ContentReportIcon from '@/assets/icons/edu.svg'
import CoffeeIcon from '@/assets/icons/cup_of_tea.svg'
import IconWrapper from '@/components/common/IconWrapper'
import Notice, {
  NoticeText,
} from '@/components/common/Notice'

export default function ContactPage() {
  const onClickReportBug = () => {
    window.location.href =
      'mailto:mnkng0000@gmail.com?subject=[🐞버그리포트]&body=버그%20현상:%0A(혹은 개선되었으면 하는 사항을 적어주세요!)'
  }

  const onClickSupport = () => {
    window.location.href =
      'mailto:mnkng0000@gmail.com?subject=[👨‍🏫내용이%20틀렸어요~]&body=포스트%20제목%20혹은%20링크:%0A틀린%20내용:%0A'
  }

  const onClickAsk = () => {
    window.location.href = 'mailto:mnkng0000@gmail.com'
  }

  const contactList = [
    {
      action: onClickReportBug,
      text: '버그 리포트하기',
      icon: <BugReportIcon />,
    },
    {
      action: onClickSupport,
      text: '틀린 내용 알려주기',
      icon: <ContentReportIcon />,
    },
    {
      action: onClickAsk,
      text: '아무거나 물어보기',
      icon: <CoffeeIcon />,
    },
  ]

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3">
      <div className="absolute top-24">
        <Notice noticeType={NoticeText.CONTACT} />
      </div>

      {contactList.map((item, index) => {
        return (
          <div
            key={index}
            onClick={item.action}
            className="cursor-pointer hover:[&>div]:!bg-white hover:[&>div]:!text-[#ff01ff] active:[&>div]:!bg-[#ff01ff] active:[&>div]:!text-white active:[&_svg]:!fill-white"
          >
            <Tag
              size="l"
              style="flex justify-center items-center gap-2"
            >
              <IconWrapper size="m">
                {item.icon}
              </IconWrapper>
              {item.text}
            </Tag>
          </div>
        )
      })}
    </div>
  )
}
