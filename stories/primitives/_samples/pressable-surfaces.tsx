/* @layer stories @kind data */
import type { ReactNode } from 'react';
import { Icon, Pressable, Text } from '../../../src/primitives';

const PRESSABLE_SURFACES: Readonly<Record<string, ReactNode>> = {
  'Bare': <Pressable>Show all 640 checks</Pressable>,
  'Menu row': (
    <Pressable className="pressable-demo__row">
      <Icon name="save" size={16} />
      <Text>Load save</Text>
      <Text variant="caption">Slot 2</Text>
    </Pressable>
  ),
  'Tile': (
    <Pressable className="pressable-demo__tile">
      <Icon name="map" size={24} />
      <Text>Light World</Text>
    </Pressable>
  ),
  'Disabled': (
    <Pressable className="pressable-demo__row" disabled>
      <Icon name="lock" size={16} />
      <Text>Dark World, locked</Text>
    </Pressable>
  ),
};

export { PRESSABLE_SURFACES };
