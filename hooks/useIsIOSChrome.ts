import { isIOSChromeUA } from '@/utils/detectDevice'
import { useEffect, useState } from 'react'

export function useIsIOSChrome() {
  const [isIOSChrome, setIsIOSChrome] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent
    setIsIOSChrome(isIOSChromeUA(ua))
  }, [])

  return isIOSChrome
}
