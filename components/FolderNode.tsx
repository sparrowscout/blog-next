import { Node } from '@/types/Folder.types'
import TreeNode, { Group, Name, Row } from './TreeNode'
import ArrowIcon from '@/assets/icons/left-arrow.svg'
import { useState } from 'react'
import IconWrapper from './common/IconWrapper'

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

  return (
    <li role="treeitem" aria-expanded={isOpen}>
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
