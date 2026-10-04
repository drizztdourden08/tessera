/* @layer stories @kind data */
const LAYER_BREAKPOINTS = [
  { id: 'large', name: 'Large room', size: '1408 × 896 px', rule: 'From 1280 px wide and 800 px high: a 2xl gap plus 5% of the smaller side.' },
  { id: 'medium', name: 'Medium room', size: '1024 × 640 px', rule: 'Under 1280 px wide or 800 px high: an xl gap plus 3% of the smaller side.' },
  { id: 'small', name: 'Small room', size: '896 × 576 px', rule: 'Under 960 px wide or 600 px high: the minimum gap, which leaves room above the floating switch.' },
  { id: 'tiny', name: 'Compact room', size: '448 × 640 px', rule: 'Under 840 px wide or 560 px high: no gap, square corners, and the switch moves inside the card.' },
] as const;

export { LAYER_BREAKPOINTS };
