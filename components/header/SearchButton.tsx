import IconButton from '../common/IconButton'
import SearchIcon from '@/assets/icons/search.svg'
import useSearchStore from '@/store/useSearchStore'
import CloseIcon from '@/assets/icons/close.svg'

export default function SearchButton() {
  const {
    isSearching,
    closeSearchScreen,
    openSearchScreen,
  } = useSearchStore()

  const onClickSearchButton = () => {
    if (isSearching) {
      closeSearchScreen()
    } else openSearchScreen()
  }
  return (
    <IconButton onClick={onClickSearchButton}>
      {isSearching ? <CloseIcon /> : <SearchIcon />}
    </IconButton>
  )
}
