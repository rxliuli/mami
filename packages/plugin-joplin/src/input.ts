import {
  Config,
  config,
  PageUtil,
  folderApi,
  noteApi,
  FolderListAllRes,
  resourceApi,
  searchApi,
  TypeEnum,
  ResourceProperties,
} from 'joplin-api'
import type { InputPlugin, Note, Resource } from '@mami/cli'
import { AsyncArray } from '@liuli-util/async'
import { listToTree, treeToList } from '@liuli-util/tree'
import { keyBy, pick } from 'lodash-es'
import path from 'path'
import { extension } from 'mime-types'

async function getFolders(): Promise<Record<string, FolderListAllRes & Pick<Note, 'path'>>> {
  const list = await folderApi.listAll()
  const treeList = treeToList(listToTree(list, { id: 'id', children: 'children', parentId: 'parent_id' }), {
    id: 'id',
    children: 'children',
    path: 'path',
  }) as unknown as (FolderListAllRes & Pick<Note, 'path'>)[]
  const map = keyBy(treeList, (item) => item.id)
  const r = keyBy(
    treeList.map((item) => ({ ...item, path: item.path.map((s) => map[s].title) })),
    (item) => item.id,
  )
  return r
}

export function calcTitle(resource: Pick<ResourceProperties, 'id' | 'title' | 'file_extension' | 'mime'>) {
  const title = resource.title ? resource.title : resource.id
  const ext = resource.file_extension ? resource.file_extension : extension(resource.mime)
  if (!ext) {
    return resource.title
  }
  const e = '.' + ext
  if (path.extname(title) === e) {
    return title
  }
  return title + e
}

export function input(options: Config & { tag: string }): InputPlugin {
  Object.assign(config, pick(options, 'baseUrl', 'token'))
  return {
    name: 'joplin',
    async *generate() {
      const folders = await getFolders()
      const notes = await PageUtil.pageToAllList((pageParam) =>
        searchApi.search({
          ...(pageParam as any),
          fields: ['id'],
          type: TypeEnum.Note,
          query: `tag:${options.tag}`,
        }),
      )
      for (const n of notes) {
        const note = await noteApi.get(n.id, [
          'id',
          'title',
          'body',
          'user_created_time',
          'user_updated_time',
          'parent_id',
        ])
        const tags = (await noteApi.tagsById(n.id)).filter((item) => item.title !== options.tag)
        const folder = folders[note.parent_id]
        const resources = await AsyncArray.map(
          await noteApi.resourcesById(n.id, ['id', 'title', 'file_extension', 'mime']),
          async (item) => {
            return {
              id: item.id,
              title: calcTitle(item),
              raw: Buffer.from(await (await resourceApi.fileById(item.id)).arrayBuffer()),
            } as Resource
          },
        )
        const inputNote: Note = {
          id: note.id,
          title: (note.title.startsWith('# ') ? note.title.slice(2) : note.title).trim(),
          content: note.body,
          createAt: note.user_created_time,
          updateAt: note.user_updated_time,
          path: folder?.path ?? [],
          tags: tags,
          resources,
        }
        yield inputNote
      }
    },
  }
}
