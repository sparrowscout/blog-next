'use client'
import Image from 'next/image'
import BackArrow from '@/assets/icons/left-arrow.svg'
import Link from 'next/link'

export default function BackButton() {
  return (
    <Link href={'/'}>
      <div className="w-fit border-[1px] border-gray-900 bg-[#fff8b9] p-2">
        <Image
          src={BackArrow}
          alt="뒤로가기"
          width={32}
          height={32}
        />
      </div>
    </Link>
  )
}
