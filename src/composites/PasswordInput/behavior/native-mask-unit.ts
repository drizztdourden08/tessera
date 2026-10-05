/* @layer renderer-components @kind util */
import { PROBE_LENGTH, PROBE_NARROW, PROBE_PAIR } from './mask.constants';
import type { MaskUnit } from './mask.type';

const found: { unit?: MaskUnit } = {};

const nativeMaskUnit = (doc: Document): MaskUnit => {
  if (found.unit !== undefined) return found.unit;
  const probe = doc.createElement('input');
  probe.type = 'password';
  probe.className = 'password-input__probe';
  probe.tabIndex = -1;
  doc.body.append(probe);
  probe.value = PROBE_NARROW.repeat(PROBE_LENGTH);
  const narrow = probe.scrollWidth;
  probe.value = PROBE_PAIR.repeat(PROBE_LENGTH);
  const pair = probe.scrollWidth;
  probe.remove();
  found.unit = pair > narrow * 1.5 ? 'code-unit' : 'grapheme';
  return found.unit;
};

export { nativeMaskUnit };
