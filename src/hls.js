import { EventEmitter } from 'eventemitter3'
import { Events } from './events'
import PlaylistLoader from './loader/playlist-loader'

export default class Hls {
  _emitter = new EventEmitter()

  constructor() {
    new PlaylistLoader(this)
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
