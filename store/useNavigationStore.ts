import { Node } from '@/types/Folder.types'
import { create } from 'zustand'

type NavigationState = {
  isNavigationOpen: boolean
  navigationTree: Node[]
}

const defaultValue: Node[] = [
  {
    id: `/`,
    name: 'home',
    type: 'file',
  },
  {
    id: 'profile',
    name: 'profile',
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
