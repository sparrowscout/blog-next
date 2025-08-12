'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useSelectedIdStore } from '@/store/useSelectedIdStore'

export default function UrlSelectSync() {
  const pathname = usePathname()
  const { setSelectedId } = useSelectedIdStore()

  // Dev(StrictMode)에서 이펙트 2번 실행 방지용 키
  const prevKey = useRef<string | null>(null)

  useEffect(() => {
    const id = pathname.slice(1, pathname.length)

    if (prevKey.current !== id) {
      setSelectedId(id)
      prevKey.current = id
    }
  }, [pathname])

  return null
}
