import { Events } from "../events";
import { waitForEvent } from "../utils";

export default class BufferController {
  constructor(hls) {
    this.hls = hls;
    // this.sourceBuffer = {}
    this.registerListeners();
  }

  registerListeners() {
    const { hls } = this;
    hls.on(Events.MEDIA_ATTACHING, this.onMediaAttaching, this);
    // hls.on(Events.BUFFER_APPENDING, this.onBufferAppending, this);

    // hls.on(Events.FRAG_LOADED, this.bufferFragmentData, this)
  }

  // async bufferFragmentData(event, segmentData) {
  //   console.log('bufferFragmentData1', this.sourceBuffer)
  //   await waitForEvent(this.sourceBuffer, 'updateend')
  //   console.log('updateend')
  // }

  async onMediaAttaching(event, data) {
    if (!data.media) return;

    // Get video element
    const media = data.media;

    // Create media source
    const mediaSource = new MediaSource();

    // Attach media source to video element
    media.src = URL.createObjectURL(mediaSource);

    // Wait for media source to open
    await waitForEvent(mediaSource, "sourceopen");
    // _onMediaSourceOpen < checkPendingTracks < createSourceBuffers

    this.hls.trigger(Events.MEDIA_ATTACHED, { media, mediaSource });

    // this.sourceBuffer = mediaSource.addSourceBuffer(
    //   'video/mp4; codecs="avc1.42c01e"'
    // );
  }

  // onBufferAppending(event, data) {
  //   this.appendExecutor(data);
  //   this.hls.trigger(Events.BUFFER_APPENDED, data);
  // }

  // This method must result in an updateend event; if append is not called, _onSBUpdateEnd must be called manually
  async appendExecutor(data) {
    console.log("appendExecutor", data);
    const sb = this.sourceBuffer;
    sb.appendBuffer(data);
    // await waitForEvent(this.sourceBuffer, "updateend");
  }

  createSourceBuffers(tracks) {
    tracks = {
      video: {
        id: "main",
        container: "video/mp4",
        codec: "avc1.64000d",
        initSegment: {
          0: 0,
          1: 0,
          2: 0,
          3: 24,
          4: 102,
          5: 116,
          6: 121,
          7: 112,
          8: 105,
          9: 115,
          10: 111,
          11: 109,
          12: 0,
          13: 0,
          14: 0,
          15: 1,
          16: 105,
          17: 115,
          18: 111,
          19: 109,
          20: 97,
          21: 118,
          22: 99,
          23: 49,
          24: 0,
          25: 0,
          26: 2,
          27: 193,
          28: 109,
          29: 111,
          30: 111,
          31: 118,
          32: 0,
          33: 0,
          34: 0,
          35: 120,
          36: 109,
          37: 118,
          38: 104,
          39: 100,
          40: 1,
          41: 0,
          42: 0,
          43: 0,
          44: 0,
          45: 0,
          46: 0,
          47: 0,
          48: 0,
          49: 0,
          50: 0,
          51: 2,
          52: 0,
          53: 0,
          54: 0,
          55: 0,
          56: 0,
          57: 0,
          58: 0,
          59: 3,
          60: 0,
          61: 1,
          62: 95,
          63: 144,
          64: 0,
          65: 0,
          66: 0,
          67: 0,
          68: 0,
          69: 41,
          70: 50,
          71: 224,
          72: 0,
          73: 1,
          74: 0,
          75: 0,
          76: 1,
          77: 0,
          78: 0,
          79: 0,
          80: 0,
          81: 0,
          82: 0,
          83: 0,
          84: 0,
          85: 0,
          86: 0,
          87: 0,
          88: 0,
          89: 1,
          90: 0,
          91: 0,
          92: 0,
          93: 0,
          94: 0,
          95: 0,
          96: 0,
          97: 0,
          98: 0,
          99: 0,
          100: 0,
          101: 0,
          102: 0,
          103: 0,
          104: 0,
          105: 1,
          106: 0,
          107: 0,
          108: 0,
          109: 0,
          110: 0,
          111: 0,
          112: 0,
          113: 0,
          114: 0,
          115: 0,
          116: 0,
          117: 0,
          118: 0,
          119: 0,
          120: 64,
          121: 0,
          122: 0,
          123: 0,
          124: 0,
          125: 0,
          126: 0,
          127: 0,
          128: 0,
          129: 0,
          130: 0,
          131: 0,
          132: 0,
          133: 0,
          134: 0,
          135: 0,
          136: 0,
          137: 0,
          138: 0,
          139: 0,
          140: 0,
          141: 0,
          142: 0,
          143: 0,
          144: 0,
          145: 0,
          146: 0,
          147: 0,
          148: 255,
          149: 255,
          150: 255,
          151: 255,
          152: 0,
          153: 0,
          154: 2,
          155: 25,
          156: 116,
          157: 114,
          158: 97,
          159: 107,
          160: 0,
          161: 0,
          162: 0,
          163: 104,
          164: 116,
          165: 107,
          166: 104,
          167: 100,
          168: 1,
          169: 0,
          170: 0,
          171: 7,
          172: 0,
          173: 0,
          174: 0,
          175: 0,
          176: 0,
          177: 0,
          178: 0,
          179: 2,
          180: 0,
          181: 0,
          182: 0,
          183: 0,
          184: 0,
          185: 0,
          186: 0,
          187: 3,
          188: 0,
          189: 0,
          190: 0,
          191: 1,
          192: 0,
          193: 0,
          194: 0,
          195: 0,
          196: 0,
          197: 0,
          198: 0,
          199: 0,
          200: 0,
          201: 41,
          202: 50,
          203: 224,
          204: 0,
          205: 0,
          206: 0,
          207: 0,
          208: 0,
          209: 0,
          210: 0,
          211: 0,
          212: 0,
          213: 0,
          214: 0,
          215: 0,
          216: 0,
          217: 0,
          218: 0,
          219: 0,
          220: 0,
          221: 1,
          222: 0,
          223: 0,
          224: 0,
          225: 0,
          226: 0,
          227: 0,
          228: 0,
          229: 0,
          230: 0,
          231: 0,
          232: 0,
          233: 0,
          234: 0,
          235: 0,
          236: 0,
          237: 1,
          238: 0,
          239: 0,
          240: 0,
          241: 0,
          242: 0,
          243: 0,
          244: 0,
          245: 0,
          246: 0,
          247: 0,
          248: 0,
          249: 0,
          250: 0,
          251: 0,
          252: 64,
          253: 0,
          254: 0,
          255: 0,
          256: 1,
          257: 64,
          258: 0,
          259: 0,
          260: 0,
          261: 240,
          262: 0,
          263: 0,
          264: 0,
          265: 0,
          266: 1,
          267: 169,
          268: 109,
          269: 100,
          270: 105,
          271: 97,
          272: 0,
          273: 0,
          274: 0,
          275: 44,
          276: 109,
          277: 100,
          278: 104,
          279: 100,
          280: 1,
          281: 0,
          282: 0,
          283: 0,
          284: 0,
          285: 0,
          286: 0,
          287: 0,
          288: 0,
          289: 0,
          290: 0,
          291: 2,
          292: 0,
          293: 0,
          294: 0,
          295: 0,
          296: 0,
          297: 0,
          298: 0,
          299: 3,
          300: 0,
          301: 1,
          302: 95,
          303: 144,
          304: 0,
          305: 0,
          306: 0,
          307: 0,
          308: 0,
          309: 41,
          310: 50,
          311: 224,
          312: 85,
          313: 196,
          314: 0,
          315: 0,
          316: 0,
          317: 0,
          318: 0,
          319: 45,
          320: 104,
          321: 100,
          322: 108,
          323: 114,
          324: 0,
          325: 0,
          326: 0,
          327: 0,
          328: 0,
          329: 0,
          330: 0,
          331: 0,
          332: 118,
          333: 105,
          334: 100,
          335: 101,
          336: 0,
          337: 0,
          338: 0,
          339: 0,
          340: 0,
          341: 0,
          342: 0,
          343: 0,
          344: 0,
          345: 0,
          346: 0,
          347: 0,
          348: 86,
          349: 105,
          350: 100,
          351: 101,
          352: 111,
          353: 72,
          354: 97,
          355: 110,
          356: 100,
          357: 108,
          358: 101,
          359: 114,
          360: 0,
          361: 0,
          362: 0,
          363: 1,
          364: 72,
          365: 109,
          366: 105,
          367: 110,
          368: 102,
          369: 0,
          370: 0,
          371: 0,
          372: 20,
          373: 118,
          374: 109,
          375: 104,
          376: 100,
          377: 0,
          378: 0,
          379: 0,
          380: 1,
          381: 0,
          382: 0,
          383: 0,
          384: 0,
          385: 0,
          386: 0,
          387: 0,
          388: 0,
          389: 0,
          390: 0,
          391: 0,
          392: 36,
          393: 100,
          394: 105,
          395: 110,
          396: 102,
          397: 0,
          398: 0,
          399: 0,
          400: 28,
          401: 100,
          402: 114,
          403: 101,
          404: 102,
          405: 0,
          406: 0,
          407: 0,
          408: 0,
          409: 0,
          410: 0,
          411: 0,
          412: 1,
          413: 0,
          414: 0,
          415: 0,
          416: 12,
          417: 117,
          418: 114,
          419: 108,
          420: 32,
          421: 0,
          422: 0,
          423: 0,
          424: 1,
          425: 0,
          426: 0,
          427: 1,
          428: 8,
          429: 115,
          430: 116,
          431: 98,
          432: 108,
          433: 0,
          434: 0,
          435: 0,
          436: 188,
          437: 115,
          438: 116,
          439: 115,
          440: 100,
          441: 0,
          442: 0,
          443: 0,
          444: 0,
          445: 0,
          446: 0,
          447: 0,
          448: 1,
          449: 0,
          450: 0,
          451: 0,
          452: 172,
          453: 97,
          454: 118,
          455: 99,
          456: 49,
          457: 0,
          458: 0,
          459: 0,
          460: 0,
          461: 0,
          462: 0,
          463: 0,
          464: 1,
          465: 0,
          466: 0,
          467: 0,
          468: 0,
          469: 0,
          470: 0,
          471: 0,
          472: 0,
          473: 0,
          474: 0,
          475: 0,
          476: 0,
          477: 0,
          478: 0,
          479: 0,
          480: 0,
          481: 1,
          482: 64,
          483: 0,
          484: 240,
          485: 0,
          486: 72,
          487: 0,
          488: 0,
          489: 0,
          490: 72,
          491: 0,
          492: 0,
          493: 0,
          494: 0,
          495: 0,
          496: 0,
          497: 0,
          498: 1,
          499: 18,
          500: 100,
          501: 97,
          502: 105,
          503: 108,
          504: 121,
          505: 109,
          506: 111,
          507: 116,
          508: 105,
          509: 111,
          510: 110,
          511: 47,
          512: 104,
          513: 108,
          514: 115,
          515: 46,
          516: 106,
          517: 115,
          518: 0,
          519: 0,
          520: 0,
          521: 0,
          522: 0,
          523: 0,
          524: 0,
          525: 0,
          526: 0,
          527: 0,
          528: 0,
          529: 0,
          530: 0,
          531: 0,
          532: 24,
          533: 17,
          534: 17,
          535: 0,
          536: 0,
          537: 0,
          538: 50,
          539: 97,
          540: 118,
          541: 99,
          542: 67,
          543: 1,
          544: 100,
          545: 0,
          546: 13,
          547: 255,
          548: 225,
          549: 0,
          550: 25,
          551: 103,
          552: 100,
          553: 0,
          554: 13,
          555: 172,
          556: 217,
          557: 65,
          558: 65,
          559: 251,
          560: 1,
          561: 16,
          562: 0,
          563: 0,
          564: 3,
          565: 0,
          566: 16,
          567: 0,
          568: 0,
          569: 3,
          570: 3,
          571: 32,
          572: 241,
          573: 66,
          574: 153,
          575: 96,
          576: 1,
          577: 0,
          578: 6,
          579: 104,
          580: 235,
          581: 227,
          582: 203,
          583: 34,
          584: 192,
          585: 0,
          586: 0,
          587: 0,
          588: 20,
          589: 98,
          590: 116,
          591: 114,
          592: 116,
          593: 0,
          594: 28,
          595: 156,
          596: 128,
          597: 0,
          598: 45,
          599: 198,
          600: 192,
          601: 0,
          602: 45,
          603: 198,
          604: 192,
          605: 0,
          606: 0,
          607: 0,
          608: 16,
          609: 112,
          610: 97,
          611: 115,
          612: 112,
          613: 0,
          614: 0,
          615: 0,
          616: 1,
          617: 0,
          618: 0,
          619: 0,
          620: 1,
          621: 0,
          622: 0,
          623: 0,
          624: 16,
          625: 115,
          626: 116,
          627: 116,
          628: 115,
          629: 0,
          630: 0,
          631: 0,
          632: 0,
          633: 0,
          634: 0,
          635: 0,
          636: 0,
          637: 0,
          638: 0,
          639: 0,
          640: 16,
          641: 115,
          642: 116,
          643: 115,
          644: 99,
          645: 0,
          646: 0,
          647: 0,
          648: 0,
          649: 0,
          650: 0,
          651: 0,
          652: 0,
          653: 0,
          654: 0,
          655: 0,
          656: 20,
          657: 115,
          658: 116,
          659: 115,
          660: 122,
          661: 0,
          662: 0,
          663: 0,
          664: 0,
          665: 0,
          666: 0,
          667: 0,
          668: 0,
          669: 0,
          670: 0,
          671: 0,
          672: 0,
          673: 0,
          674: 0,
          675: 0,
          676: 16,
          677: 115,
          678: 116,
          679: 99,
          680: 111,
          681: 0,
          682: 0,
          683: 0,
          684: 0,
          685: 0,
          686: 0,
          687: 0,
          688: 0,
          689: 0,
          690: 0,
          691: 0,
          692: 40,
          693: 109,
          694: 118,
          695: 101,
          696: 120,
          697: 0,
          698: 0,
          699: 0,
          700: 32,
          701: 116,
          702: 114,
          703: 101,
          704: 120,
          705: 0,
          706: 0,
          707: 0,
          708: 0,
          709: 0,
          710: 0,
          711: 0,
          712: 1,
          713: 0,
          714: 0,
          715: 0,
          716: 1,
          717: 0,
          718: 0,
          719: 0,
          720: 0,
          721: 0,
          722: 0,
          723: 0,
          724: 0,
          725: 0,
          726: 1,
          727: 0,
          728: 1,
        },
        metadata: {
          width: 320,
          height: 240,
        },
      },
    };

    const mimeType = `${track.container};codecs=${codec}`;
  }
}
