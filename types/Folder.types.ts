export type Node = {
  id: string
  name: string
  type: 'folder' | 'file'
  children?: Node[]
}
