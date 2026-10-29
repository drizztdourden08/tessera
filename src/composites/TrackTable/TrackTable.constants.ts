/* @layer renderer-components @kind data */
import type { TrackDrop, TrackHideBelow } from './TrackTable.type';

const HIDE_STEPS: readonly TrackHideBelow[] = [1280, 1120, 896, 768, 640, 480];

const DROP_STEPS: Readonly<Record<TrackDrop, TrackHideBelow>> = { 1: 768, 2: 640, 3: 480 };

const TEMPLATE_PROPERTY = '--track-cols-';

const DEFAULT_FR = 1;

const TOKEN_NAME = /^(size|space)-[a-z0-9]+$/;

export { DEFAULT_FR, DROP_STEPS, HIDE_STEPS, TEMPLATE_PROPERTY, TOKEN_NAME };
