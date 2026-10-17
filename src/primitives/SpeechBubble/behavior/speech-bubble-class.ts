/* @layer renderer-components @kind logic */
import type { CalloutTone } from '../../Callout/Callout.type';
import type { SpeechBubblePointer } from '../SpeechBubble.type';

const speechBubbleClass = (tone: CalloutTone | undefined, pointer: SpeechBubblePointer, extra: string | undefined): string =>
  ['speech-bubble', tone && `speech-bubble--${tone}`, pointer !== 'none' && `speech-bubble--${pointer}`, extra].filter(Boolean).join(' ');

export { speechBubbleClass };
