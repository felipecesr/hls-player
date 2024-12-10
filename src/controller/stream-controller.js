import { Events } from '../events'

export default class StreamController {
	constructor(hls) {
		this.hls = hls;
    this.registerListeners();
	}
	
	registerListeners() {
		this.hls.on(Events.MEDIA_ATTACHED, this.onMediaAttached, this);
    this.hls.on(Events.LEVEL_LOADED, this.onLevelLoaded, this);
  }
  
  onMediaAttached(event, data) {
    console.log('MediaElement attached to MediaSource');
    const { media, mediaSource } = data;
    this.media = media;
    this.mediaSource = mediaSource;
  }

  async onLevelLoaded(event, data) {
	  const { details } = data;
    const duration = details.totalduration;
    
    this.sourceBuffer = this.mediaSource.addSourceBuffer(
      'video/mp4; codecs="avc1.42c01e"'
    );
    this.mediaSource.duration = duration;

    for (const fragment of details.fragments) {
      const segmentData = await fetch(fragment.url).then((buf) =>
        buf.arrayBuffer()
      );
      await this._handleFragmentLoadProgress(segmentData)
    }
  }

  async _handleFragmentLoadProgress(segmentData) {}
}
