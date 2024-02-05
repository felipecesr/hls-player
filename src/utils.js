/**
 * 
 * @param {EventTarget} target 
 * @param {string | string[]} types 
 * @param {AbortSignal} signal 
 * @returns {Promise<Event>}
 */
export function waitForEvent(
  target,
  types,
  signal
) {
  types = Array.isArray(types) ? types : [types];
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(signal.reason);
    }
    const listener = (event) => {
      for (const type of types) {
        target.removeEventListener(type, listener);
      }
      signal?.removeEventListener("abort", abortListener);
      resolve(event);
    };
    const abortListener = () => {
      reject(signal.reason);
    };
    for (const type of types) {
      target.addEventListener(type, listener, { once: true, signal });
    }
    signal?.addEventListener("abort", abortListener, { once: true });
  });
}
