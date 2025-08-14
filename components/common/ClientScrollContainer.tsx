// components/ClientScrollContainer.tsx
'use client'
import * as React from 'react'
import { useIsIOSChrome } from '@/hooks/useIsIOSChrome'

type Props = React.PropsWithChildren<{
  className?: string
  paddingValue?: number // 필요시 인라인 보정
}>

export default function ClientScrollContainer({
  className,
  children,
  paddingValue,
}: Props) {
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

  return (
    <div className={cls} style={style}>
      {children}
    </div>
  )
}
