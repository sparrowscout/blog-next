import { Node } from '@/types/Folder.types'
import { create } from 'zustand'

type NavigationState = {
  isNavigationOpen: boolean
  navigationTree: Node[]
}

export enum DefaultCategory {
  HOME = 'home',
  PROFILE = 'profile',
  CONTACT = 'contact',
}

const defaultValue: Node[] = [
  {
    id: `/`,
    name: DefaultCategory.HOME,
    type: 'file',
  },
  {
    id: 'profile',
    name: DefaultCategory.PROFILE,
    type: 'file',
  },
  {
    id: 'contact',
    name: DefaultCategory.CONTACT,
    type: 'file',
  },
]

type NavigationAction = {
  closeNavigation: () => void
  switchNavigationOpen: () => void
  setNavigationTree: (nodes: Node[]) => void
  addNode: (node: Node) => void
}
const useNavigationStore = create<
  NavigationState & NavigationAction
>()((set) => ({
  isNavigationOpen: false,
  navigationTree: defaultValue,
  closeNavigation: () => set({ isNavigationOpen: false }),
  switchNavigationOpen: () =>
    set((state) => ({
      isNavigationOpen: !state.isNavigationOpen,
    })),
  setNavigationTree: (nodes) =>
    set(() => ({
      navigationTree: [...defaultValue, ...nodes],
    })),

  addNode: (node: Node) =>
    set((state) => {
      return {
        navigationTree: [...state.navigationTree, node],
      }
    }),
}))

export default useNavigationStore
