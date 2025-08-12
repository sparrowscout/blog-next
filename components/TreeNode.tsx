import styled from 'styled-components'
import { Node } from '@/types/Folder.types'
import FolderNode from './FolderNode'
import FileNode from './FileNode'

interface TreeProps {
  node: Node
  depth: number
}

export default function TreeNode({
  node,
  depth,
}: TreeProps) {
  const isFolder = node.type === 'folder'

  return (
    <>
      {isFolder ? (
        <FolderNode depth={depth} node={node} />
      ) : (
        <FileNode depth={depth} node={node} />
      )}
    </>
  )
}

export const Row = styled.div<{
  $depth: number
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  padding-left: ${({ $depth }) => 12 + $depth * 16}px;
  user-select: none;
`

export const CaretPlaceholder = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
`

export const Name = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Group = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
