import { Events } from "../events"
import { waitForEvent } from '../utils'
import BaseStreamController from './base-stream-controller'
import TransmuxerInterface from '../demux/transmuxer-interface'

export default class StreamController extends BaseStreamController {
  constructor(hls) {
    super(hls)
    this.registerListeners()
  }

  registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this)
    this.hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this)
  }

  onMediaAttached(event, data) {
    const { media, mediaSource } = data;
    this.media = media;
    this.mediaSource = mediaSource;
    console.log('onMediaAttached', mediaSource);
  }

  async onLevelLoaded(event, data) {
    // const { levels } = this;
    // const newLevelId = data.level;
    const newDetails = data.details;
    const duration = newDetails.totalduration;
    console.log('onLevelLoaded', this.mediaSource);

    // const sourceBuffer = this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42c01e"')
    // this.mediaSource.duration = duration

    // const transmuxer = new mp4.Transmuxer()
    // transmuxer.on('data', segment => {
    //   const data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength)
    //   data.set(segment.initSegment, 0)
    //   data.set(segment.data, segment.initSegment.byteLength)
    //   sourceBuffer.appendBuffer(data)
    // })

    // FRAG_LOADING
    for (const fragment of newDetails.fragments) {
      this._doFragLoad(fragment)
      const segmentData = await fetch(fragment.url).then(buf => buf.arrayBuffer())
      this._handleFragmentLoadProgress(segmentData)
      // transmuxer.push(new Uint8Array(segmentData))
      // transmuxer.flush()
      // await waitForEvent(sourceBuffer, 'updateend')
    }

    this.hls.trigger(Events.LEVEL_UPDATED, {
      details: newDetails,
      // level: newLevelId,
    });
  }

  _handleFragmentLoadProgress(segmentData) {
    const transmuxer = new TransmuxerInterface(this.hls, this._handleTransmuxComplete.bind(this))
    transmuxer.push(new Uint8Array(segmentData))
  }

  _handleTransmuxComplete(transmuxResult) {
    this.bufferFragmentData(transmuxResult)
  }
}
