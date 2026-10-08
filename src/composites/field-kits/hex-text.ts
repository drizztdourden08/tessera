/* @layer renderer-components @kind util */
import type { NumberFormat } from '../../data/schema/field-descriptor';
import { HEX_WIDTH } from './NumberKit.constants';

const hexText = (raw: number, format: NumberFormat): string =>
  `0x${Math.trunc(raw).toString(16).toUpperCase().padStart(HEX_WIDTH[format], '0')}`;

export { hexText };
