import { create } from 'zustand'

type MenuState = {
  isMenuOpen: boolean
}

type MenuAction = {
  closeMenu: () => void
  openMenu: () => void
  switchMenuOpen: () => void
}
const useMenuStore = create<MenuState & MenuAction>()(
  (set) => ({
    isMenuOpen: false,
    openMenu: () => set({ isMenuOpen: true }),
    closeMenu: () => set({ isMenuOpen: false }),
    switchMenuOpen: () =>
      set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  }),
)

export default useMenuStore
