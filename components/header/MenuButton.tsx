'use client'
import MenuIcon from '@/assets/icons/menu.svg'
import CloseIcon from '@/assets/icons/close.svg'
import IconButton from '../common/IconButton'
import useMenuStore from '@/store/useMenuStore'

export default function MenuButton() {
  const { isMenuOpen, switchMenuOpen } = useMenuStore()
  return (
    <IconButton onClick={switchMenuOpen}>
      {isMenuOpen ? (
        <CloseIcon style={{ fill: '#FF01FF' }} />
      ) : (
        <MenuIcon style={{ fill: '#FF01FF' }} />
      )}
    </IconButton>
  )
}
