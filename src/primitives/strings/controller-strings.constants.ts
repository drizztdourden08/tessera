/* @layer renderer-components @kind data */
const CONTROLLER_STRINGS = {
  controller: 'Controller',
  held: 'Held now',
  nothingHeld: 'Nothing held',
  otherInputs: 'Other inputs',
  amount: (name: string, percent: number) => `${name} ${percent}%`,
  stickAt: (name: string, x: string, y: string) => `${name} at ${x}, ${y}`,
  names: {
    'face.north': 'Top face button',
    'face.east': 'Right face button',
    'face.south': 'Bottom face button',
    'face.west': 'Left face button',
    'dpad.up': 'D-pad up',
    'dpad.down': 'D-pad down',
    'dpad.left': 'D-pad left',
    'dpad.right': 'D-pad right',
    'shoulder.left': 'Left shoulder',
    'shoulder.right': 'Right shoulder',
    'trigger.left': 'Left trigger',
    'trigger.right': 'Right trigger',
    'stick.left': 'Left stick',
    'stick.right': 'Right stick',
    'stick.left.click': 'Left stick click',
    'stick.right.click': 'Right stick click',
    'meta.view': 'View',
    'meta.menu': 'Menu',
    'meta.guide': 'Guide',
    'meta.capture': 'Capture',
  },
};

export { CONTROLLER_STRINGS };
