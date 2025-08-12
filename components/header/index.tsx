import BackButton from './BackButton'
import HomeButton from './Homebutton'
import NavigationButton from './NavigationButton'
import SearchButton from './SearchButton'
import VersionButton from './VersionButton'

export default function Header() {
  return (
    <div className="fixed z-50 flex  h-20 w-full items-center justify-between px-3">
      <div className="flex w-1/2  gap-2">
        <BackButton />
        <VersionButton />
      </div>
      <div className="flex w-1/2 justify-end gap-2 pl-10">
        <SearchButton />
        <NavigationButton />
      </div>
      <HomeButton />
    </div>
  )
}
