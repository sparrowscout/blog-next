'use client'
import MenuIcon from '@/assets/icons/menu.svg'
import CloseIcon from '@/assets/icons/close.svg'
import IconButton from '../common/IconButton'
import useNavigationStore from '@/store/useNavigationStore'

export default function NavigationButton() {
  const { isNavigationOpen, switchNavigationOpen } =
    useNavigationStore()

  return (
    <IconButton onClick={switchNavigationOpen}>
      {isNavigationOpen ? (
        <CloseIcon style={{ fill: '#FF01FF' }} />
      ) : (
        <MenuIcon style={{ fill: '#FF01FF' }} />
      )}
    </IconButton>
  )
}
