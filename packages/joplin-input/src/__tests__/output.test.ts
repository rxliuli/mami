import { convert, InputPlugin, Note, Resource, Tag } from '@mami/cli'
import path from 'path'
import { beforeEach, it } from 'vitest'
import { output } from '../output'
import { readFile } from '@liuli-util/fs-extra'
import '../utils/nodePolyfill'
import { config, Config, folderApi, noteApi, PageUtil, tagApi } from 'joplin-api'
import { AsyncArray } from '@liuli-util/async'
import { pick } from 'lodash-es'

const options: Config = {
  baseUrl: 'http://localhost:27583',
  token:
    '5bcfa49330788dd68efea27a0a133d2df24df68c3fd78731eaa9914ef34811a34a782233025ed8a651677ec303de6a04e54b57a27d48898ff043fd812d8e0b31',
}

export async function clearDatabase() {
  await Promise.all((await PageUtil.pageToAllList(tagApi.list)).map(({ id }) => tagApi.remove(id)))
  await Promise.all((await PageUtil.pageToAllList(noteApi.list)).map(({ id }) => noteApi.remove(id)))
  await Promise.all((await PageUtil.pageToAllList(folderApi.list)).map(({ id }) => folderApi.remove(id)))
}

beforeEach(async () => {
  Object.assign(config, pick(options, 'baseUrl', 'token'))
  await clearDatabase()
})

it('output', async () => {
  const mockInput: InputPlugin = {
    name: 'generateVirtual',
    async *generate() {
      yield {
        id: 'test1',
        title: 'test1',
        content: `
# test1

[test2](:/test2)
        `.trim(),
        resources: [] as Resource[],
        tags: [{ id: 'test', title: 'test' }] as Tag[],
        path: ['a', 'b'],
      } as Note
      yield {
        id: 'test2',
        title: 'test2',
        content: `
# test2

[test1](:/test1)
[localDirOutput.test.ts](:/test)
                `.trim(),
        resources: [
          {
            id: 'test',
            title: path.basename(__filename),
            raw: await readFile(__filename),
          },
        ] as Resource[],
        tags: [{ id: 'test', title: 'test' }] as Tag[],
        path: ['c'],
      } as Note
    },
  }

  await convert({
    input: [mockInput],
    output: [output(options)],
  })
})
