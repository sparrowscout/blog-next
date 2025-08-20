import { ReactElement, SVGProps } from 'react'
import IconWrapper from './common/IconWrapper'
import HomeIcon from '@/assets/icons/home.svg'
import ProfileIcon from '@/assets/icons/profile.svg'
import ContactIcon from '@/assets/icons/contact.svg'
import { DefaultCategory } from '@/store/useNavigationStore'

interface TreeIconCaretProps {
  id: DefaultCategory | string
}

export default function TreeIconCaret({
  id,
}: TreeIconCaretProps) {
  const iconMap: Map<
    DefaultCategory,
    ReactElement<SVGProps<SVGSVGElement>>
  > = new Map()
    .set(DefaultCategory.HOME, <HomeIcon />)
    .set(DefaultCategory.PROFILE, <ProfileIcon />)
    .set(DefaultCategory.CONTACT, <ContactIcon />)

  const icon = iconMap.get(id as DefaultCategory)

  if (icon)
    return <IconWrapper size="s">{icon}</IconWrapper>
  else
    return (
      <div className="flex w-4 justify-end !text-[#ff01ff]">
        ᛫
      </div>
    )
}
