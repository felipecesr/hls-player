import Hls from './hls'

const video = document.querySelector('#video')
const videoSrc = '/video/index.m3u8'

const hls = new Hls()
hls.loadSource(videoSrc)
hls.attachMedia(video)
