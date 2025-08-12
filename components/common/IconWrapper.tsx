import { cloneElement, ReactElement, SVGProps } from 'react'

interface IconWrapper {
  children: ReactElement<SVGProps<SVGSVGElement>>
  size: 's' | 'm' | 'l' | 'xl'
  color?: string
}

const sizeMap = {
  s: 16,
  m: 24,
  l: 32,
  xl: 36,
}

export default function IconWrapper({
  children,
  color = '#ff01ff',
  size,
}: IconWrapper) {
  return cloneElement(children, {
    width: sizeMap[size],
    height: sizeMap[size],
    style: {
      fill: color,
      ...(children.props.style || {}),
    },
  })
}
