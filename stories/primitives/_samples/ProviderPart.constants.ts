/* @layer stories @kind data */
import type { SegmentOption, TesseraOverrides } from '../../../src/primitives';
import type { ProviderMode } from './ProviderPart.type';

const PROVIDER_MODES: SegmentOption<ProviderMode>[] = [
  { value: 'tessera', label: 'Tessera default' },
  { value: 'app', label: 'App version' },
];

const NO_OVERRIDES: TesseraOverrides = {};

const NO_CALL_YET = 'None yet.';

export { NO_CALL_YET, NO_OVERRIDES, PROVIDER_MODES };
