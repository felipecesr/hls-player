import { mp4 } from 'mux.js'

export default class TransmuxerInterface {
  constructor(hls, onTransmuxComplete) {
    this.hls = hls
    this.onTransmuxComplete = onTransmuxComplete

    this.transmuxer = new mp4.Transmuxer()
    this.transmuxer.on('data', segment => this.onTransmuxComplete(segment))
  }

  push(segmentData) {
    this.transmuxer.push(segmentData)
  }

  flush() {
    this.transmuxer.flush()
  }
}
