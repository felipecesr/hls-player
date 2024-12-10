import { Events } from '../events'

export default class MSEMediaController {
	constructor(hls) {
    this.hls = hls;
    this.registerListeners();
  }

  registerListeners() {
    this.hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
  }

  async onMediaAttaching(event, data) {
    if (!data.media) return;

    const media = data.media;
    const mediaSource = new MediaSource();

    media.src = URL.createObjectURL(mediaSource);

    await waitForEvent(mediaSource, "sourceopen");

    this.hls.trigger(Events.MEDIA_ATTACHED, { media, mediaSource });
  }
}
