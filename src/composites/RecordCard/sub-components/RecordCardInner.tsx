/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { RecordHeader } from '../../RecordHeader';
import { RecordCardCompact } from './RecordCardCompact';
import type { RecordCardInnerProps } from './RecordCardInner.type';

const RecordCardInner = (props: RecordCardInnerProps) => {
  const { density, expanded, bodyId, chevron, title, icon, code, content, end, menu, chevronOnIcon, children } = props;
  if (density === 'compact') {
    return <RecordCardCompact title={title} icon={icon} code={code} content={content} end={end} menu={menu} chevronOnIcon={chevronOnIcon} />;
  }
  return (
    <>
      <RecordHeader title={expanded ? undefined : title} icon={icon} code={code} content={content} menu={menu} density={density} chevron={chevron} chevronOnIcon={chevronOnIcon} />
      {expanded && (
        <Box id={bodyId} className="record-card__body">
          <Text variant="label">{title}</Text>
          {children}
        </Box>
      )}
    </>
  );
};

export { RecordCardInner };
