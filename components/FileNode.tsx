import { Node } from '@/types/Folder.types'
import { CaretPlaceholder, Name, Row } from './TreeNode'
import Link from 'next/link'
import useNavigationStore from '@/store/useNavigationStore'
import TreeIconCaret from './TreeIconCaret'
import { useSelectedIdStore } from '@/store/useSelectedIdStore'
import IconWrapper from './common/IconWrapper'
import TailArrow from '@/assets/icons/arrow_with_tail.svg'
interface FileNode {
  node: Node
  depth: number
}

export default function FileNode({
  depth,
  node,
}: FileNode) {
  const { closeNavigation } = useNavigationStore()
  const { selectedId } = useSelectedIdStore()
  const isSelected = selectedId === node.id
  const onClickFileNode = () => {
    closeNavigation()
  }

  return (
    <Link href={node.id}>
      <li
        role="treeitem"
        className={`hover:[&_span]:!text-[#ff01ff] active:[&_span]:!text-[#ff01ff] ${isSelected ? '[&_span]:!text-[#ff01ff]' : ''}`}
      >
        <Row $depth={depth} onClick={onClickFileNode}>
          <TreeIconCaret id={node.name} />

          <Name>{node.name}</Name>
          {isSelected && (
            <IconWrapper size="s">
              <TailArrow />
            </IconWrapper>
          )}
        </Row>
      </li>
    </Link>
  )
}
