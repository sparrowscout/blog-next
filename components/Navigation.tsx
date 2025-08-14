'use client'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import useCategoryListStore from '@/store/useCategoryListStore'
import { Node } from '@/types/Folder.types'
import useNavigationStore from '@/store/useNavigationStore'
import TreeView from './TreeView'

export default function Navigation() {
  const { categoryList } = useCategoryListStore()
  const { setNavigationTree } = useNavigationStore()

  const builtTree: Node[] = useMemo(() => {
    if (!categoryList || categoryList.size === 0) return []

    const nodes: Node[] = []
    for (const [category, { content }] of categoryList) {
      const children: Node[] = content.map((item) => ({
        id: item.slug,
        name: item.title,
        type: 'file',
      }))
      nodes.push({
        id: `cat:${category}`,
        name: category,
        type: 'folder',
        children,
      })
    }
    return [
      {
        id: 'posts',
        name: 'posts',
        type: 'folder',
        children: nodes,
      },
    ]
  }, [categoryList])

  useEffect(() => {
    if (builtTree.length === 0) return
    setNavigationTree(builtTree)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builtTree])

  return (
    <div
      id="navigation"
      className="absolute z-20 h-dvh w-dvw bg-white pt-20 "
    >
      <Tree role="tree" aria-label="File tree">
        <TreeView />
      </Tree>
    </div>
  )
}

const Tree = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
