/* @layer renderer-components @kind util */
import { TUNNEL_SELECTOR } from '../DropdownMenu.constants';

const usedLine = (panel: HTMLElement, line: number, zoom: number): number => {
  const tunnel = panel.querySelector(TUNNEL_SELECTOR);
  if (!tunnel) return line;
  const used = (tunnel.getBoundingClientRect().top - panel.getBoundingClientRect().top) / zoom + line;
  return used > 0 && used <= line ? used : line;
};

export { usedLine };
