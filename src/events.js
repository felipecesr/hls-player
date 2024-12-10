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
   * fired to signal that a manifest loading starts - data: { url : manifestURL }
   */
  MANIFEST_LOADING: 'hlsManifestLoading',
  /**
   * fired when a level playlist loading finishes - data: { details : levelDetails object, level : id of loaded level, stats : LoaderStats }
   */
  LEVEL_LOADED: 'hlsLevelLoaded',
}
