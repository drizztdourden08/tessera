/* @layer stories @kind component */
import { Text, useHint } from '../../../src/primitives';

const HintEcho = () => {
  const hint = useHint();
  return (
    <Text as="p" variant="caption" className="segment-hint-demo__line">
      {hint ? `useHint: { label: '${hint.label}', description: '${hint.description}' }` : 'useHint: null'}
    </Text>
  );
};

export { HintEcho };
