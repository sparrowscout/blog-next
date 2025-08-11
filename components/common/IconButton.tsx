import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

interface IconButtonProps {
  iconSrc?: string | StaticImageData
  bgColor?: string
  children?: ReactNode
  onClick?: () => void
}

export default function IconButton({
  iconSrc,
  children,
  onClick,
  bgColor = 'bg-white',
}: IconButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex  h-14 w-14  cursor-pointer items-center justify-center border-[1px] border-black ${bgColor}`}
    >
      {children && (
        <div className="flex h-full w-full items-center justify-center p-2 [&>svg]:h-9 [&>svg]:w-9">
          {children}
        </div>
      )}
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="go home"
          width={100}
          height={100}
          style={{
            position: 'absolute',
            objectFit: 'contain',
            padding: '8px',
          }}
        />
      )}
    </div>
  )
}
