import Hls from './hls'

const videoSrc = '/video/index.m3u8'

const hls = new Hls()
hls.loadSource(videoSrc)
