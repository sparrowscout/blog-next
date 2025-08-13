'use client'
import BackArrow from '@/assets/icons/left-arrow.svg'
import { usePathname, useRouter } from 'next/navigation'
import IconButton from '../common/IconButton'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  const onClickButton = () => {
    router.back()
  }

  if (pathname !== '/')
    return (
      <IconButton onClick={onClickButton}>
        <BackArrow />
      </IconButton>
    )
}
