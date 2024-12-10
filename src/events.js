export const Events = {
  /**
   * Fired before MediaSource is attaching to media element
   */
  MEDIA_ATTACHING: 'hlsMediaAttaching',
  /**
   * fired to signal that a manifest loading starts - data: { url : manifestURL }
   */
  MANIFEST_LOADING: 'hlsManifestLoading',
}
