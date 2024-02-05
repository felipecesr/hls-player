import { EventEmitter } from 'eventemitter3'
import { Events } from './events'
import PlaylistLoader from './loader/playlist-loader'
import LevelController from './controller/level-controller'
import StreamController from './controller/stream-controller'
import BufferController from './controller/buffer-controller'

export default class Hls {
  _emitter = new EventEmitter()

  constructor() {
    new PlaylistLoader(this)
    new LevelController(this)
    new StreamController(this)
    new BufferController(this)
  }

  on(event, listener, context) {
    this._emitter.on(event, listener, context)
  }

  trigger(event, eventObject) {
    return this._emitter.emit(event, event, eventObject)
  }

  static isSupported() {
    return (window.MediaSource && MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'))
  }

  loadSource(url) {
    this.trigger(Events.MANIFEST_LOADING, { url });
  }

  attachMedia(media) {
    this.trigger(Events.MEDIA_ATTACHING, { media })
  }
}
