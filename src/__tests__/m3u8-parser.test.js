import { expect, test } from 'vitest'
import { parseLevelPlaylist } from "../loader/m3u8-parser";

test("parseLevelPlaylist", () => {
  const playlist = `
    #EXTM3U
    #EXT-X-VERSION:3
    #EXT-X-TARGETDURATION:10
    #EXT-X-MEDIA-SEQUENCE:0
    #EXTINF:10.000000,
    data00.ts
    #EXTINF:10.000000,
    data01.ts
    #EXTINF:10.000000,
    data02.ts
    #EXT-X-ENDLIST
  `
  const result = parseLevelPlaylist(playlist, '/videos', 'main')

  expect(result).toMatchInlineSnapshot(`
{
  "endSN": 2,
  "fragments": [
    {
      "baseurl": "/videos",
      "duration": 10,
      "level": "main",
      "sn": 0,
      "start": 0,
      "url": "/videos/data00.ts",
    },
    {
      "baseurl": "/videos",
      "duration": 10,
      "level": "main",
      "sn": 1,
      "start": 10,
      "url": "/videos/data01.ts",
    },
    {
      "baseurl": "/videos",
      "duration": 10,
      "level": "main",
      "sn": 2,
      "start": 20,
      "url": "/videos/data02.ts",
    },
  ],
  "live": false,
  "startSN": 0,
  "targetduration": 10,
  "totalduration": 30,
}
`)
})
