/* @layer renderer-components @kind util */
import { lazy } from 'react';

const LazyColorPicker = lazy(async () => {
  const { ColorPicker } = await import('../../ColorPicker');
  return { default: ColorPicker };
});

export { LazyColorPicker };
