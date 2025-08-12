import { Node } from '@/types/Folder.types'
import { CaretPlaceholder, Name, Row } from './TreeNode'
import Link from 'next/link'
import useNavigationStore from '@/store/useNavigationStore'

interface FileNode {
  node: Node
  depth: number
}

export default function FileNode({
  depth,
  node,
}: FileNode) {
  const { closeNavigation } = useNavigationStore()

  const onClickFileNode = () => {
    closeNavigation()
  }

  return (
    <Link href={node.id}>
      <li
        role="treeitem"
        className="hover:[&_span]:!text-[#ff01ff]"
      >
        <Row $depth={depth} onClick={onClickFileNode}>
          <CaretPlaceholder />
          <Name>{node.name}</Name>
        </Row>
      </li>
    </Link>
  )
}
