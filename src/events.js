export const Events = {
  /**
   * Fired before MediaSource is attaching to media element
   */
  MEDIA_ATTACHING: 'hlsMediaAttaching',
  /**
   * Fired when MediaSource has been successfully attached to media element
   */
  MEDIA_ATTACHED: 'hlsMediaAttached',
  /**
   * fired when we append a segment to the buffer - data: { segment: segment object }
   */
  BUFFER_APPENDING: 'hlsBufferAppending',
  /**
   * fired when we are done with appending a media segment to the buffer - data : { parent : segment parent that triggered BUFFER_APPENDING, pending : nb of segments waiting for appending for this segment parent}
   */
  BUFFER_APPENDED: 'hlsBufferAppended',
  /**
   * fired to signal that a manifest loading starts - data: { url : manifestURL }
   */
  MANIFEST_LOADING: 'hlsManifestLoading',
  /**
   * fired after manifest has been loaded - data: { levels : [available quality levels], audioTracks : [ available audio tracks ], url : manifestURL, stats : LoaderStats }
   */
  MANIFEST_LOADED: 'hlsManifestLoaded',
  /**
   * fired after manifest has been parsed - data: { levels : [available quality levels], firstLevel : index of first quality level appearing in Manifest}
   */
  MANIFEST_PARSED: 'hlsManifestParsed',
  /**
   * fired when a level playlist loading finishes - data: { details : levelDetails object, level : id of loaded level, stats : LoaderStats }
   */
  LEVEL_LOADED: 'hlsLevelLoaded',
  /**
   * fired when a level's details have been updated based on previous details, after it has been loaded - data: { details : levelDetails object, level : id of updated level }
   */
  LEVEL_UPDATED: 'hlsLevelUpdated',
  /**
   * fired when a fragment loading starts - data: { frag : fragment object }
   */
  FRAG_LOADING: 'hlsFragLoading',
  /**
   * fired when a fragment loading is completed - data: { frag : fragment object, payload : fragment payload, stats : LoaderStats }
   */
  FRAG_LOADED: 'hlsFragLoaded',
}
