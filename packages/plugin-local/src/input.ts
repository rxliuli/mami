import { AsyncArray } from '@liuli-util/async'
import { pathExists, stat } from '@liuli-util/fs-extra'
import {
  fromMarkdown,
  getYamlMeta,
  Link,
  Root,
  toMarkdown,
  visit,
  Image,
  selectAll,
  setYamlMeta,
} from '@liuli-util/markdown-util'
import { InputPlugin, Note, Tag } from '@mami/cli'
import { BiMultiMap } from '@mami/utils'
import FastGlob from 'fast-glob'
import { readFile } from 'fs/promises'
import { keyBy, dropRight, uniqBy } from 'lodash-es'
import path from 'path'
import { ValuesType } from 'utility-types'
import { v4 } from 'uuid'
import { LocalNoteMeta } from './output'

interface ScanNote {
  id: string
  title: string
  relPath: string
}

export async function scan(root: string): Promise<ScanNote[]> {
  return (
    await FastGlob('**/*.md', {
      cwd: root,
      onlyFiles: true,
      ignore: ['.obsidian'],
    })
  ).map((item) => ({
    id: v4(),
    title: path.basename(item, '.md'),
    relPath: item,
  }))
}

export function convertYamlTab(content: string) {
  const sub = '---\n'
  const start = content.indexOf(sub)
  if (start === -1) {
    return content
  }
  const end = content.slice(start + sub.length).indexOf(sub)
  if (end === -1) {
    return content
  }
  const s = content.substring(start + sub.length, start + sub.length + end)
  return content.replace(s, s.replaceAll('\t', '  '))
}

export function convertLinks({
  root,
  resourceMap,
  list,
  notePath,
  rootPath,
}: {
  root: Root
  list: ScanNote[]
  resourceMap: BiMultiMap<string, string>
  notePath: string
  rootPath: string
}): { id: string; fsPath: string }[] {
  const urls = selectAll('image,link', root) as (Image | Link)[]
  const noteMap = keyBy(list, (item) => item.relPath)
  const resources: { id: string; fsPath: string }[] = []
  urls.forEach((item) => {
    if (!['../', './'].some((s) => item.url.startsWith(s))) {
      return
    }
    const fsPath = path.resolve(path.dirname(notePath), item.url)
    const relPath = path.relative(rootPath, fsPath).replaceAll('\\', '/')
    if (noteMap[relPath]) {
      item.url = `:/${noteMap[relPath].id}`
      return
    }
    if (!resourceMap.has(fsPath)) {
      resourceMap.set(fsPath, v4())
    }
    resources.push({ id: resourceMap.get(fsPath)!, fsPath })
    item.url = `:/${resourceMap.get(fsPath)}`
  })
  return uniqBy(resources, (item) => item.id)
}

export function input(options: { root: string }): InputPlugin {
  return {
    name: 'local',
    async *generate() {
      const list = await scan(options.root)
      const resourceMap = new BiMultiMap<string, string>()
      const tagMap = new Map<string, Tag>()
      for (const item of list) {
        const fsPath = path.resolve(options.root, item.relPath)
        const root = fromMarkdown(convertYamlTab(await readFile(fsPath, 'utf-8')))
        const meta = (getYamlMeta(root) ?? {}) as Partial<LocalNoteMeta>
        const resources = convertLinks({
          root,
          rootPath: options.root,
          notePath: fsPath,
          list,
          resourceMap,
        })
        setYamlMeta(root, null)
        const tags = (meta.tags ?? []).map((title) => {
          if (tagMap.has(title)) {
            return tagMap.get(title)!
          }
          const r = { id: v4(), title } as Tag
          tagMap.set(title, r)
          return r
        })
        const s = await stat(fsPath)
        const note: Note = {
          id: item.id,
          title: meta.title ?? item.title,
          content: toMarkdown(root),
          createAt: meta.createAt ?? s.ctimeMs,
          updateAt: meta.updateAt ?? s.mtimeMs,
          tags,
          resources: await new AsyncArray(resources)
            .filter((item) => pathExists(item.fsPath))
            .map(async (item) => {
              return {
                id: item.id,
                title: path.basename(item.fsPath),
                raw: await readFile(item.fsPath),
              }
            }),
          path: dropRight(
            item.relPath.split('/').filter((s) => s.length !== 0),
            1,
          ),
        }
        yield note
      }
    },
  }
}
