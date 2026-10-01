/* @layer renderer-components @kind types */
import type { SliderProps } from '../Slider.type';

type SliderTrackProps = Omit<SliderProps, 'label' | 'description' | 'size' | 'hint' | 'onHint' | 'aria-label'> & { name?: string };

export type { SliderTrackProps };
