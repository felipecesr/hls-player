import { Events } from '../events'

export default class FragmentLoader {
  constructor(hls) {
    this.hls = hls
    this.registerListeners()
  }

  registerListeners() {
    this.hls.on(Events.FRAG_LOADING, this.onFragLoading, this)
  }

  async onFragLoading(event, data) {
    const { fragment } = data
    const segmentData = await fetch(fragment.url).then(buf => buf.arrayBuffer())
    this.hls.trigger(Events.FRAG_LOADED, { frag: fragment, payload: segmentData })
  }
}
