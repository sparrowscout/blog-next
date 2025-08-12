import Image, { StaticImageData } from 'next/image'
import { ReactElement, SVGProps } from 'react'
import IconWrapper from './IconWrapper'

interface IconButtonProps {
  iconSrc?: string | StaticImageData
  bgColor?: string
  children?: ReactElement<SVGProps<SVGSVGElement>>
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
        <IconWrapper size="xl">{children}</IconWrapper>
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
