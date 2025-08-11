'use client'
import HomeIcon from '@/assets/img/home.png'
import Link from 'next/link'
import IconButton from '../common/IconButton'

export default function HomeButton() {
  return (
    <Link href={'/'}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <IconButton iconSrc={HomeIcon} />
      </div>
    </Link>
  )
}
