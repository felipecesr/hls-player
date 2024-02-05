import { expect, test, vi } from 'vitest'
import Hls from '../hls'

test.skip('hls', () => {
  const hls = new Hls()
  vi.spyOn(console, 'log')
  hls.loadSource('/video/index.m3u8')
  expect(console.log).toHaveBeenCalledWith('hlsManifestLoading', { url: '/video/index.m3u8' })
})