const LEVEL_PLAYLIST_REGEX_FAST =
  /(?:#EXT-X-(MEDIA-SEQUENCE):(\d+))|(?:#EXT-X-(TARGETDURATION):(\d+))|(?:#EXT(INF):([\d.]+)[^\r\n]*[\r\n]+([^\r\n]+)|(?:#EXT-X-(ENDLIST)))/g;

export function parseLevelPlaylist(string, baseurl, id) {
  const level = { fragments: [] };
  let result = null;
  let totalduration = 0;
  let currentSN = 0;

  while ((result = LEVEL_PLAYLIST_REGEX_FAST.exec(string)) !== null) {
    result.shift();
    result = result.filter((n) => n !== undefined);

    switch (result[0]) {
      case "MEDIA-SEQUENCE":
        level.startSN = parseInt(result[1]);
        break;
      case "TARGETDURATION":
        level.targetduration = parseFloat(result[1]);
        break;
      case "ENDLIST":
        level.live = false;
        break;
      case "INF":
        var duration = parseFloat(result[1]);
        level.fragments.push({
          url: baseurl + '/' + result[2].trim(),
          baseurl,
          duration: duration,
          start: totalduration,
          sn: currentSN++,
          level: id,
        });
        totalduration += duration;
        break;
      default:
        break;
    }
  }

  level.totalduration = totalduration;
  level.endSN = currentSN - 1;
  return level;
}
