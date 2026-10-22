/* @layer stories @kind story */
import { Box, Stepper } from '../../../src/primitives';
import type { StepperProps } from '../../../src/primitives';
import { ladderSteps } from './stepper-data';

const LADDER_LOOKS = ['Ring dots, steps 1, 3 and 4 lit', 'Filled dots', 'Grey', 'Name below, with pictures', 'Narrow box that scrolls'] as const;

const MEDIA_PLACES = ['Above the dot, the default', 'Below the dot', 'Below the dot, name below'] as const;

const HIDDEN_LOOKS = ['Name hidden, pictures above', 'Name hidden, pictures below'] as const;

const SIZES = ['Medium, the default', 'Small'] as const;

const LIT_SOME: ReadonlySet<string> = new Set(['lamp', 'rupees-25', 'bee']);

const ladderProps = (look: (typeof LADDER_LOOKS)[number]): Partial<StepperProps> => {
  if (look === 'Filled dots') return { dotVariant: 'filled' };
  if (look === 'Grey') return { tone: 'neutral' };
  if (look === 'Name below, with pictures') return { labelPlacement: 'below' };
  return {};
};

const mediaProps = (place: (typeof MEDIA_PLACES)[number]): Partial<StepperProps> => {
  if (place === 'Below the dot') return { mediaPlacement: 'below' };
  if (place === 'Below the dot, name below') return { mediaPlacement: 'below', labelPlacement: 'below' };
  return { mediaPlacement: 'above' };
};

const ladderWith = (extra: Partial<StepperProps>, narrow = false) => (
  <Box className={narrow ? 'stepper-story__narrow' : 'stepper-story__wide'}>
    <Stepper
      steps={ladderSteps(LIT_SOME)}
      selectMode="toggle"
      labelPlacement="above"
      dotVariant="ring"
      tone="warning"
      reserve="none"
      stepWidth="sm"
      scroll
      onSelect={() => undefined}
      label="Steps to keep"
      {...extra}
    />
  </Box>
);

const ladder = (look: (typeof LADDER_LOOKS)[number]) => ladderWith(ladderProps(look), look === 'Narrow box that scrolls');

const ladderMedia = (place: (typeof MEDIA_PLACES)[number]) => ladderWith(mediaProps(place));

const ladderHidden = (look: (typeof HIDDEN_LOOKS)[number]) =>
  ladderWith({ labelPlacement: 'hidden', mediaPlacement: look === 'Name hidden, pictures below' ? 'below' : 'above' });

const ladderSize = (size: (typeof SIZES)[number]) =>
  ladderWith({ size: size === 'Small' ? 'sm' : 'md', dotVariant: 'ring', mediaPlacement: 'below', labelPlacement: 'hidden' });

export { HIDDEN_LOOKS, LADDER_LOOKS, MEDIA_PLACES, SIZES, ladder, ladderHidden, ladderMedia, ladderSize };
