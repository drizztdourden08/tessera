/* @layer root-config @kind config */
import { defineStandards } from '@drizztdourden08/standards';

export default defineStandards({
  presets: ['design-system'],
  extensions: ['./standards.extension.mjs'],
  options: {
    eslint: {
      rawControls: [
        { selector: "JSXOpeningElement[name.name='input']", message: 'No raw <input> outside primitives. Use TextInput / NumberInput / Checkbox / RangeInput.' },
        { selector: "JSXOpeningElement[name.name='select']", message: 'No raw <select> outside primitives. Use Select / NativeSelect.' },
        { selector: "JSXOpeningElement[name.name='textarea']", message: 'No raw <textarea> outside primitives. Use TextArea.' },
      ],
    },
  },
});
