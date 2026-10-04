/* @layer renderer-components @kind logic */
import { MOTION_PART_ATTR } from '../../motion/motion.constants';
import type { PartOutput, PartSlot, PoseWriter } from './pose-writer.type';
import { UPRIGHT_PREFIX } from './upright.constants';

const collect = (svg: SVGSVGElement, effects: ReadonlySet<string>): Map<string, PartSlot> => {
  const slots = new Map<string, PartSlot>();
  for (const element of svg.querySelectorAll<SVGElement>(`[${MOTION_PART_ATTR}]`)) {
    const part = element.getAttribute(MOTION_PART_ATTR) ?? '';
    if (part.startsWith(UPRIGHT_PREFIX)) continue;
    const attr = element.getAttribute('opacity') === '0' ? 0 : 1;
    const slot = slots.get(part) ?? { elements: [], holders: [], key: '', effect: effects.has(part), parked: false, attr };
    slots.set(part, { ...slot, elements: [...slot.elements, element] });
  }
  return slots;
};

const letGo = (slot: PartSlot): void => {
  for (const holder of slot.holders) holder?.cancel();
  slot.holders = [];
  slot.key = '';
};

const setAttr = (slot: PartSlot, opacity: number): void => {
  if (slot.attr === opacity) return;
  slot.attr = opacity;
  for (const element of slot.elements) {
    if (opacity === 1) element.removeAttribute('opacity');
    else element.setAttribute('opacity', String(opacity));
  }
};

const hold = (slot: PartSlot, output: PartOutput): void => {
  const frame: Keyframe = { transform: output.transform || 'none', ...(output.fades ? { opacity: String(output.opacity - slot.attr) } : {}) };
  slot.elements.forEach((element, i) => {
    const holder = slot.holders[i];
    if (holder) {
      (holder.effect as KeyframeEffect).setKeyframes([frame, frame]);
      return;
    }
    const created = element.animate([frame, frame], { duration: 1, fill: 'both', composite: 'add' });
    created.pause();
    slot.holders[i] = created;
  });
};

const settle = (slot: PartSlot, output: PartOutput | undefined): void => {
  letGo(slot);
  setAttr(slot, output ? output.opacity : slot.effect ? 0 : 1);
};

const writeParts = (slots: ReadonlyMap<string, PartSlot>, outputs: ReadonlyMap<string, PartOutput>, tracked: ReadonlySet<string>): void => {
  for (const [part, slot] of slots) {
    const output = outputs.get(part);
    const isTracked = tracked.has(part) && output !== undefined;
    const key = output ? `${isTracked ? 'h' : 's'}|${output.transform}|${output.opacity}|${output.fades}` : '-';
    if (key === slot.key) continue;
    if (isTracked) hold(slot, output);
    else settle(slot, output);
    slot.key = key;
  }
};

/** Writes poses into one mascot's drawing. */
const createPoseWriter = (svg: SVGSVGElement, effects: ReadonlySet<string>, upright: ReadonlyMap<string, number>): PoseWriter => {
  const slots = collect(svg, effects);
  const turners = [...svg.querySelectorAll<SVGElement>(`[${MOTION_PART_ATTR}^="${UPRIGHT_PREFIX}"]`)];
  let flippedNow = false;
  return {
    write: (outputs, tracked) => writeParts(slots, outputs, tracked),
    release: () => {
      for (const slot of slots.values()) letGo(slot);
    },
    base: (shown) => {
      for (const [part, slot] of slots) if (slot.effect && slot.holders.length === 0) setAttr(slot, shown.has(part) ? 1 : 0);
    },
    park: (inUse) => {
      for (const [part, slot] of slots) {
        const parked = slot.effect && !inUse.has(part);
        if (parked === slot.parked) continue;
        slot.parked = parked;
        for (const element of slot.elements) {
          if (parked) element.setAttribute('display', 'none');
          else element.removeAttribute('display');
        }
      }
    },
    mirror: (flipped) => {
      if (flipped === flippedNow) return;
      flippedNow = flipped;
      for (const turner of turners) {
        const axis = upright.get((turner.getAttribute(MOTION_PART_ATTR) ?? '').slice(UPRIGHT_PREFIX.length)) ?? 0;
        if (flipped) turner.setAttribute('transform', `translate(${2 * axis} 0) scale(-1 1)`);
        else turner.removeAttribute('transform');
      }
    },
    dispose: () => {
      for (const slot of slots.values()) letGo(slot);
    },
  };
};

export { createPoseWriter };
