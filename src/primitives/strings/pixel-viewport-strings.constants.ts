/* @layer renderer-components @kind data */
const PIXEL_VIEWPORT_STRINGS = {
  role: 'pixel image',
  zoomLevel: (zoom: number) => `Zoom ${Math.round(zoom * 100)}%`,
};

export { PIXEL_VIEWPORT_STRINGS };
