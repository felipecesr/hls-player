import { expect, test, vi } from 'vitest'
import Hls from '../../hls'
import LevelController from '../level-controller'
import { Events } from '../../events'

test('level controller', () => {
  const hls = new Hls()
  const levelController = new LevelController(hls)
})
