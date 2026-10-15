/* @layer stories @kind component */
import { Box, Button, Card, DensityScope, Flex, Text } from '../../../src/primitives';
import type { DenseEditorPanelProps } from './DenseEditorPanel.type';
import { DenseLayoutSection } from './DenseLayoutSection';
import { DenseLookSection } from './DenseLookSection';
import { DenseMotionSection } from './DenseMotionSection';
import './DenseEditorPanel.css';

const DenseEditorPanel = (props: DenseEditorPanelProps) => {
  const { density } = props;
  return (
    <DensityScope density={density}>
      <Card title="Health bar" subtitle="Layout node" className="dense-editor">
        <Box className="dense-editor__body">
          <Text variant="overline">Layout</Text>
          <DenseLayoutSection />
          <Text variant="overline">Look</Text>
          <DenseLookSection />
          <Text variant="overline">Motion</Text>
          <DenseMotionSection />
          <Flex gap="xs" justify="end">
            <Button variant="ghost">Reset</Button>
            <Button variant="primary">Apply</Button>
          </Flex>
        </Box>
      </Card>
    </DensityScope>
  );
};

export { DenseEditorPanel };
