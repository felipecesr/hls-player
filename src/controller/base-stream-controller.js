import { Events } from "../events"
// import { waitForEvent } from '../utils'

export default class BaseStreamController {
  constructor(hls) {
    this.hls = hls
  }

  async _doFragLoad(fragment) {
    // this.hls.trigger(Events.FRAG_LOADING, { frag: fragment })
    const segmentData = await fetch(fragment.url).then(buf => buf.arrayBuffer())
    this._handleFragmentLoadProgress(segmentData)
    // this.hls.trigger(Events.FRAG_LOADED, segmentData)
    // await waitForEvent(sourceBuffer, 'updateend')
  }

  bufferFragmentData(segment) {
    const data = new Uint8Array(segment.initSegment.byteLength + segment.data.byteLength)
    data.set(segment.initSegment, 0)
    data.set(segment.data, segment.initSegment.byteLength)
    this.hls.trigger(Events.BUFFER_APPENDING, data)
  }
}
