import { Events } from '../events'
import * as M3U8Parser from './m3u8-parser'

export default class PlaylistLoader {
  constructor(hls) {
    this.hls = hls
    this.registerListeners()
  }

  registerListeners() {
    this.hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
  }

  onManifestLoading(event, data) {
    this.load(data.url)
  }

  // loader.load
  async load(videoSrc) {
    const response = await fetch(videoSrc)
    const data = await response.text()
    return this.handleTrackOrLevelPlaylist(data)
  }

  handleTrackOrLevelPlaylist(data) {
    // const baseUrl = videoSrc.match(/(.*)\/.*\.m3u8/)[1]
    const levelDetails = M3U8Parser.parseLevelPlaylist(data, '/video')

    // if (type === 'manifest')
    const singleLevel = { details: levelDetails }
    this.hls.trigger(Events.MANIFEST_LOADED, {
      levels: [singleLevel]
    })
    // endif

    this.handlePlaylistLoaded(levelDetails)
  }

  handlePlaylistLoaded(levelDetails) {
    // const { type } = context??

    // if (type === 'level')
    this.hls.trigger(Events.LEVEL_LOADED, {
      details: levelDetails
    })
  }
}
