import { Events } from '../events'
import { parsePlaylist } from './m3u8-parser'

export default class PlaylistLoader {
  constructor(hls) {
    this.hls = hls
    this.registerListeners()
  }

  registerListeners() {
    this.hls.on(Events.MANIFEST_LOADING, this.onManifestLoading, this)
  }

  onManifestLoading(event, data) {
    const { url } = data;
    fetch(url)
      .then(response => response.text())
      .then(text => console.log(parsePlaylist(text, '/video')));
  }
}
