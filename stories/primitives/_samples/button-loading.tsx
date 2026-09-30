/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { Box, Button, Flex, Glyph, Text } from '../../../src/primitives';
import type { ButtonSize } from '../../../src/primitives/Button/Button.type';
import { axis, VariantGrid } from '../../_template/VariantGrid';
import { SAVE_MS } from './button-loading.constants';

type LoadingKind = 'label only' | 'with icon';

const KINDS: readonly LoadingKind[] = ['label only', 'with icon'];

const SIZES: readonly ButtonSize[] = ['md', 'sm'];

const SaveRow = () => {
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!saving) return undefined;
    const timer = setTimeout(() => setSaving(false), SAVE_MS);
    return () => clearTimeout(timer);
  }, [saving]);

  return (
    <Flex gap="sm" align="center">
      <Button variant="primary" loading={saving} onClick={() => setSaving(true)}>Save changes</Button>
      <Button variant="tertiary" icon={<Glyph name="save" />} loading={saving} onClick={() => setSaving(true)}>Save a copy</Button>
      <Button variant="ghost">Cancel</Button>
    </Flex>
  );
};

const ButtonLoading = () => (
  <Box className="story-column">
    <VariantGrid
      rows={axis(KINDS)}
      columns={axis(SIZES)}
      cell={(kind, size) => (
        <Button variant="primary" size={size} loading icon={kind === 'with icon' ? <Glyph name="save" /> : undefined}>Save changes</Button>
      )}
    />
    <Text variant="caption">Press a save button: it turns busy for a moment and the row keeps its place.</Text>
    <SaveRow />
  </Box>
);

export { ButtonLoading };
