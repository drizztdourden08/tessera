/* @layer renderer-components @kind util */
const APP_PATH = /^\/(?![/\\])[^\t\n\r\\]*$/;

const isAppPath = (url: string): boolean => APP_PATH.test(url);

export { isAppPath };
