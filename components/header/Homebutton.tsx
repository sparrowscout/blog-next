'use client'
import HomeIcon from '@/assets/img/home.png'
import Link from 'next/link'
import IconButton from '../common/IconButton'
import useNavigationStore from '@/store/useNavigationStore'

export default function HomeButton() {
  const { closeNavigation } = useNavigationStore()
  return (
    <Link href={'/'} onClick={closeNavigation}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <IconButton iconSrc={HomeIcon} />
      </div>
    </Link>
  )
}
