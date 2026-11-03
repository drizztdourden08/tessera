/* @layer renderer-components @kind logic */
const zoomPresets = (presets: readonly number[] | undefined, min: number, max: number): number[] =>
  [...new Set(presets ?? [])].filter((preset) => preset >= min && preset <= max).sort((left, right) => left - right);

export { zoomPresets };
