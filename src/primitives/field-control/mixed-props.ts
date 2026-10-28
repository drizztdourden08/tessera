/* @layer renderer-components @kind util */
import type { MixedInputProps } from './mixed-props.type';

const mixedProps = (mixed: boolean | undefined, word: string): MixedInputProps =>
  (mixed === true ? { value: '', defaultValue: undefined, placeholder: word, 'data-mixed': true } : {});

export { mixedProps };
