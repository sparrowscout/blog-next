import { Node } from '@/types/Folder.types'
import TreeNode, { Group, Name, Row } from './TreeNode'
import ArrowIcon from '@/assets/icons/left-arrow.svg'
import { useEffect, useState } from 'react'
import IconWrapper from './common/IconWrapper'
import { useSelectedIdStore } from '@/store/useSelectedIdStore'

interface FolderNodeProps {
  node: Node
  depth: number
}

export default function FolderNode({
  depth,
  node,
}: FolderNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(
    node.id === 'posts',
  )
  const { selectedId } = useSelectedIdStore()

  const findSelectedChild = (children: Node[]) => {
    return children.find((item) => item.id === selectedId)
  }

  // 현재 페이지 == 자식 컨텐츠면 isOpen = true
  const checkSelected = () => {
    if (
      node.children &&
      node.children.length > 0 &&
      node.id !== 'posts'
    ) {
      if (findSelectedChild(node.children)) {
        setIsOpen(true)
      }
    }
  }

  useEffect(() => {
    checkSelected()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <li
      role="treeitem"
      aria-expanded={isOpen}
      aria-selected={node.id === selectedId}
    >
      <Row
        $depth={depth}
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
      >
        <div
          aria-label={
            isOpen ? 'Collapse folder' : 'Expand folder'
          }
        >
          <IconWrapper size="s">
            <ArrowIcon
              style={{
                rotate: `${isOpen ? '-90deg' : '-180deg'}`,
                transition: 'all 0.3s',
              }}
            />
          </IconWrapper>
        </div>

        <Name>{node.name}</Name>
      </Row>

      {isOpen &&
        node.children &&
        node.children.length > 0 && (
          <Group role="group">
            {node.children.map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
              />
            ))}
          </Group>
        )}
    </li>
  )
}
