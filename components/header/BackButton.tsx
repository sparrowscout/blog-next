'use client'
import BackArrow from '@/assets/icons/left-arrow.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import IconButton from '../common/IconButton'

export default function BackButton() {
  const pathname = usePathname()

  if (pathname !== '/')
    return (
      <Link href={'/'}>
        <IconButton bgColor="bg-[#fff8b9]">
          <BackArrow style={{ fill: '#333' }} />
        </IconButton>
      </Link>
    )
}
