'use client'
import * as React from 'react'
import { useIsIOSChrome } from '@/hooks/useIsIOSChrome'
import IconButton from './IconButton'
import ArrowIcon from '@/assets/icons/arrow_with_tail.svg'

type Props = React.PropsWithChildren<{
  className?: string
  paddingValue?: number
}>

export default function ClientScrollContainer({
  className,
  children,
  paddingValue,
}: Props) {
  const [isToTopBtnShowing, setIsToTopBtnShowing] =
    React.useState<boolean>(false)
  const scrollContainer = React.useRef<HTMLDivElement>(null)
  const isIOSChrome = useIsIOSChrome()
  // iOS Chrome(오버레이)면 패딩 X, 그 외에는 패딩 추가
  const cls = `${className ?? ''} ${isIOSChrome ? '' : 'pr-2'}`
  const style = paddingValue
    ? {
        paddingRight: isIOSChrome
          ? undefined
          : paddingValue,
      }
    : undefined

  React.useEffect(() => {
    const container = scrollContainer.current
    if (!container) return

    container.onscroll = () => {
      if (container.scrollTop > 120) {
        setIsToTopBtnShowing(true)
      } else setIsToTopBtnShowing(false)
    }
  }, [scrollContainer.current])

  const onClickToTop = () => {
    const container = scrollContainer.current
    if (!container) return

    container.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={cls}
      style={style}
      ref={scrollContainer}
    >
      <div
        className={`fixed -right-0  bottom-10   ${isToTopBtnShowing ? '-translate-x-10 ' : 'translate-x-40'}  transition-transform ease-in-out`}
        onClick={onClickToTop}
      >
        <IconButton>
          <ArrowIcon style={{ rotate: '90deg' }} />
        </IconButton>
      </div>
      {children}
    </div>
  )
}
