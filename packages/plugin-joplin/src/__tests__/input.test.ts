import { expect, it, vi } from 'vitest'
import { convert, Note, OutputPlugin } from '@mami/cli'
import { input } from '../input'
import '../utils/nodePolyfill'

it.skip('joplinInput', async () => {
  const mockFn = vi.fn()
  const outputVirtual: OutputPlugin = {
    name: 'outputVirtual',
    handle: mockFn,
  }
  await convert({
    input: [
      input({
        baseUrl: 'http://localhost:27583',
        token:
          '5bcfa49330788dd68efea27a0a133d2df24df68c3fd78731eaa9914ef34811a34a782233025ed8a651677ec303de6a04e54b57a27d48898ff043fd812d8e0b31',
        tag: '',
      }),
    ],
    output: [outputVirtual],
  })
  const r = mockFn.mock.calls.map((item) => (item[0] as Note).title)
  expect(r).not.empty
})