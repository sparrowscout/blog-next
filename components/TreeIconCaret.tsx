import { ReactElement, SVGProps } from 'react'
import IconWrapper from './common/IconWrapper'
import HomeIcon from '@/assets/icons/home.svg'
import ProfileIcon from '@/assets/icons/profile.svg'
import PostsIcon from '@/assets/icons/posts.svg'

interface TreeIconCaretProps {
  id: string
}

export default function TreeIconCaret({
  id,
}: TreeIconCaretProps) {
  const iconMap: Map<
    string,
    ReactElement<SVGProps<SVGSVGElement>>
  > = new Map()
    .set('home', <HomeIcon />)
    .set('profile', <ProfileIcon />)
    .set('posts', <PostsIcon />)

  const icon = iconMap.get(id)

  if (icon)
    return <IconWrapper size="s">{icon}</IconWrapper>
  else
    return (
      <div className="flex w-4 justify-end !text-[#ff01ff]">
        ᛫
      </div>
    )
}
