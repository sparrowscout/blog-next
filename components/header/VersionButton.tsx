'use client'
import BlogIcon from '@/assets/icons/blog.svg'
import CabinetIcon from '@/assets/icons/cabinet.svg'
import IconButton from '../common/IconButton'
import useBlogTypeStore, {
  BlogType,
} from '@/store/useBlogTypeStore'

export default function VersionButton() {
  const { blogType, changeBlogType } = useBlogTypeStore()

  const onHandleClick = () => {
    changeBlogType(
      blogType === BlogType.DEFAULT
        ? BlogType.CABINET
        : BlogType.DEFAULT,
    )
  }
  return blogType === BlogType.DEFAULT ? (
    <IconButton onClick={onHandleClick}>
      <BlogIcon style={{ fill: '#ff01ff' }} />
    </IconButton>
  ) : (
    <IconButton
      bgColor="bg-[#ff01ff]"
      onClick={onHandleClick}
    >
      <CabinetIcon style={{ fill: '#fff' }} />
    </IconButton>
  )
}
