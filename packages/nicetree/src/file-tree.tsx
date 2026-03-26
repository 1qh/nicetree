'use client'
import { useState } from 'react'
import { cn } from './cn'
import { FileIcon, FolderIcon } from './icon'
interface TreeNode {
  children?: TreeNode[]
  name: string
  path: string
}
const PADDINGS = [
    'pl-2',
    'pl-6',
    'pl-10',
    'pl-14',
    'pl-18',
    'pl-22',
    'pl-26',
    'pl-30',
    'pl-34',
    'pl-38',
    'pl-42',
    'pl-46'
  ],
  pad = (depth: number) => PADDINGS[Math.min(depth, PADDINGS.length - 1)],
  ROW =
    'flex w-full items-center gap-1.5 py-0.5 pr-2 text-left text-sm hover:bg-[var(--nicetree-hover,hsl(var(--accent)))]',
  FileTree = ({
    className,
    nodes,
    onSelect,
    selected
  }: {
    className?: string
    nodes: TreeNode[]
    onSelect?: (path: string) => void
    selected?: null | string
  }) => {
    const [expanded, setExpanded] = useState<Set<string>>(() => {
        const set = new Set<string>(),
          walk = (items: TreeNode[]) => {
            for (const item of items)
              if (item.children) {
                set.add(item.path)
                walk(item.children)
              }
          }
        walk(nodes)
        return set
      }),
      toggle = (path: string) => {
        setExpanded(prev => {
          const next = new Set(prev)
          if (next.has(path)) next.delete(path)
          else next.add(path)
          return next
        })
      },
      handleSelect = onSelect ?? (() => undefined),
      sel = selected ?? null,
      renderNode = (node: TreeNode, depth: number): React.ReactNode => {
        if (node.children) {
          const isOpen = expanded.has(node.path)
          return (
            <div key={node.path}>
              <button className={cn(ROW, pad(depth))} onClick={() => toggle(node.path)} type='button'>
                <FolderIcon className='size-4 shrink-0 [&_svg]:size-4' open={isOpen} />
                <span className='truncate font-medium'>{node.name}</span>
              </button>
              {isOpen ? node.children.map(async child => renderNode(child, depth + 1)) : null}
            </div>
          )
        }
        return (
          <button
            className={cn(ROW, pad(depth), sel === node.path && 'bg-[var(--nicetree-selected,hsl(var(--accent)))]')}
            key={node.path}
            onClick={() => handleSelect(node.path)}
            type='button'>
            <FileIcon className='size-4 shrink-0 [&_svg]:size-4' name={node.name} />
            <span className='truncate'>{node.name}</span>
          </button>
        )
      }
    return (
      <nav aria-label='File tree' className={cn('select-none overflow-auto text-sm', className)}>
        {nodes.map(async node => renderNode(node, 0))}
      </nav>
    )
  }
export type { TreeNode }
export { FileTree }
