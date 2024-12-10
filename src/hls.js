import { EventEmitter } from 'eventemitter3'
import { Events } from './events'
import PlaylistLoader from './loader/playlist-loader'
import MSEMediaController from './controller/mse-media-controller'
import StreamController from './controller/stream-controller'

export default class Hls {
  _emitter = new EventEmitter()

  constructor() {
    new PlaylistLoader(this)
    new MSEMediaController(this)
    new StreamController(this)
  }

  on(event, listener, context) {
    this._emitter.on(event, listener, context)
  }

  trigger(event, eventObject) {
    return this._emitter.emit(event, event, eventObject)
  }

  loadSource(url) {
    this.trigger(Events.MANIFEST_LOADING, { url });
  }

  attachMedia(media) {
    this.trigger(Events.MEDIA_ATTACHING, { media })
  }
}
