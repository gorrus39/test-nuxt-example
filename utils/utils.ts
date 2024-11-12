import type { Node } from "~/types";

const getAllNodeIds = (nodes: Node[], ids: number[] = []):number[] => {
  for (const node of nodes) {
    ids.push(node.id)
    if (node.childs && node.childs.length > 0) return getAllNodeIds(node.childs, ids) 
  }
  return ids
}

export const getMaxNodeId = (nodes: Node[]) => Math.max(...getAllNodeIds(nodes))

export const getParentNodeById = (nodes: Node[], id:number): Node | undefined=> {
  for (const node of nodes) {
    if (node.id == id) return node
    if (node.childs) return getParentNodeById(node.childs, id)
  }
} 