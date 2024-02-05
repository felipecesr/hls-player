import { Events } from '../events'
import { waitForEvent } from '../utils'

export default class BufferController {
  constructor(hls) {
    this.hls = hls
    // this.sourceBuffer = {}
    this.registerListeners()
  }

  registerListeners() {
    const { hls } = this
    hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this)
    hls.on(Events.BUFFER_APPENDING, this.onBufferAppending, this)

    // hls.on(Events.FRAG_LOADED, this.bufferFragmentData, this)
  }

  // async bufferFragmentData(event, segmentData) {
  //   console.log('bufferFragmentData1', this.sourceBuffer)
  //   await waitForEvent(this.sourceBuffer, 'updateend')
  //   console.log('updateend')
  // }

  async onMediaAttaching(event, data) {
    if (!data.media) return

    // Get video element
    const media = data.media
    
    // Create media source
    const mediaSource = new MediaSource()

    // Attach media source to video element
    media.src = URL.createObjectURL(mediaSource)

    // Wait for media source to open
    await waitForEvent(mediaSource, 'sourceopen')

    this.hls.trigger(Events.MEDIA_ATTACHED, { media, mediaSource })

    this.sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42c01e"')
  }

  onBufferAppending(event, data) {
    this.appendExecutor(data)
    this.hls.trigger(Events.BUFFER_APPENDED, data)
  }

  // This method must result in an updateend event; if append is not called, _onSBUpdateEnd must be called manually
  appendExecutor(data) {
    console.log('appendExecutor', data)
    const sb = this.sourceBuffer
    sb.appendBuffer(data)
  }
}
