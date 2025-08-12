import { create } from 'zustand'

type SelectedIdState = {
  selectedId: string | null
}

type SelectedIdAction = {
  setSelectedId: (id: string | null) => void
}
export const useSelectedIdStore = create<
  SelectedIdState & SelectedIdAction
>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}))
