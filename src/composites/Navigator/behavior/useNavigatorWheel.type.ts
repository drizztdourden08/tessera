/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { NavigatorProps } from '../Navigator.type';

interface NavigatorWheelInput extends Pick<NavigatorProps, 'surface' | 'onWheelZoom'> {
  mapRef: RefObject<HTMLElement | null>;
}

export type { NavigatorWheelInput };
