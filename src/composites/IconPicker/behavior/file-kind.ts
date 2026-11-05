/* @layer renderer-components @kind logic */
import { PNG_MIME, SVG_MIME } from '../IconPicker.constants';

const fileKind = (file: File): 'svg' | 'png' | null => {
  const name = file.name.toLowerCase();
  if (file.type === SVG_MIME || name.endsWith('.svg')) return 'svg';
  if (file.type === PNG_MIME || name.endsWith('.png')) return 'png';
  return null;
};

export { fileKind };
