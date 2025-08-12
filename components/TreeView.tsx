'use client'
import useNavigationStore from '@/store/useNavigationStore'
import TreeNode from './TreeNode'

export default function TreeView() {
  const { navigationTree } = useNavigationStore()

  return (
    <>
      {navigationTree.map((item, index) => (
        <TreeNode key={index} node={item} depth={0} />
      ))}
    </>
  )
}
