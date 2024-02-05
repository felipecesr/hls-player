import Hls from './hls'

const video = document.querySelector('#video')
const videoSrc = '/video/index.m3u8'

if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSrc;
} else if (Hls.isSupported()) {
  const hls = new Hls()
  hls.loadSource(videoSrc)
  hls.attachMedia(video)
}
