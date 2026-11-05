/* @layer stories @kind component */
import { Button, Flex, Icon, Text } from '../../src/primitives';
import type { ButtonSize } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

const ICON_SIZES = ['12', '16', '24', '32', '48'] as const;
const BUTTON_SIZES: readonly ButtonSize[] = ['xs', 'sm', 'md', 'lg'];

const IconTextRows = () => (
  <>
    <Demonstrator
      rows={axis(ICON_SIZES)}
      cell={(size) => (
        <Flex className="icon-text-row" gap="xs">
          <Icon name="compass" size={Number(size)} />
          <Text>Icon {size}px beside text</Text>
        </Flex>
      )}
    />
    <Demonstrator
      rows={axis(BUTTON_SIZES)}
      cell={(size) => (
        <Flex className="icon-text-row" gap="sm">
          <Icon name="compass" size={16} />
          <Button size={size} icon={<Icon name="plus" />}>Add {size}</Button>
          <Button size={size} iconEnd={<Icon name="arrow-right" />} variant="secondary">Next {size}</Button>
        </Flex>
      )}
    />
  </>
);

export { IconTextRows };
