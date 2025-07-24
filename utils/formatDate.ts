// utils/formatDate.ts
import {
  format,
  formatDistanceToNow,
  differenceInDays,
  differenceInMonths,
} from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatSmartDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()

  const daysDiff = differenceInDays(now, date)
  const monthsDiff = differenceInMonths(now, date)

  if (daysDiff < 7) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ko,
    }) // 1일 전, 2일 전 ...
  }

  if (daysDiff < 28) {
    const weeks = Math.floor(daysDiff / 7)
    return `${weeks}주 전`
  }

  if (monthsDiff < 12) {
    return `${monthsDiff}달 전`
  }

  return format(date, 'yy/MM/dd') // 예: 24/03/28
}
