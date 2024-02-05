import { Events } from '../events'

export default class LevelController {
  constructor(hls) {
    this.hls = hls
    this.registerListeners()
  }

  registerListeners() {
    this.hls.on(Events.MANIFEST_LOADED, this.onManifestLoaded, this)
  }

  onManifestLoaded(event, data) {
    this.hls.trigger(Events.MANIFEST_PARSED, { levels: [data] });
  }
}
