import { create } from 'zustand'

type SearchState = {
  isSearching: boolean
}

type SearchAction = {
  closeSearchScreen: () => void
  openSearchScreen: () => void
}

const useSearchStore = create<SearchState & SearchAction>()(
  (set) => ({
    isSearching: false,
    closeSearchScreen: () => set({ isSearching: false }),
    openSearchScreen: () => set({ isSearching: true }),
  }),
)

export default useSearchStore
