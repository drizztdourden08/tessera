/* @layer renderer-components @kind constants */
const EASE = {
  inOut: 'cubic-bezier(0.37, 0, 0.63, 1)',
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  in: 'cubic-bezier(0.55, 0, 1, 0.45)',
  rise: 'cubic-bezier(0.33, 1, 0.68, 1)',
  fall: 'cubic-bezier(0.32, 0, 0.67, 0)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  snap: 'cubic-bezier(0.16, 1, 0.3, 1)',
  linear: 'linear',
} as const;

const RIG_PART = 'rig';

const SHADOW_PART = 'shadow';

const MOTION_PART_ATTR = 'data-motion-part';

export { EASE, MOTION_PART_ATTR, RIG_PART, SHADOW_PART };
