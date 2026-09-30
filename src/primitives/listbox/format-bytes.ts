/* @layer renderer-components @kind util */
import { BYTE_STEP, BYTE_UNITS } from './format-bytes.constants';

const formatBytes = (bytes: number): string => {
  const magnitude = Math.floor(Math.log(Math.max(Math.abs(bytes), 1)) / Math.log(BYTE_STEP));
  const exponent = Math.min(magnitude, BYTE_UNITS.length - 1);
  const scaled = bytes / BYTE_STEP ** exponent;
  const digits = exponent === 0 ? 0 : 1;
  return `${scaled.toLocaleString(undefined, { maximumFractionDigits: digits })} ${BYTE_UNITS[exponent] ?? ''}`;
};

export { formatBytes };
