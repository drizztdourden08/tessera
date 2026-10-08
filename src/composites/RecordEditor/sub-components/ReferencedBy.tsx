/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Disclosure } from '../../../primitives/Disclosure';
import { Text } from '../../../primitives/Text';
import { Paragraph } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ReferencedByHit } from '../RecordEditor.type';
import type { KindGroup, ReferencedByProps } from './ReferencedBy.type';
import '../../../theme/record-editor.css';
import './ReferencedBy.css';

const groupByKind = (hits: readonly ReferencedByHit[]): readonly KindGroup[] => {
  const order: string[] = [];
  const byKind = new Map<string, ReferencedByHit[]>();
  for (const hit of hits) {
    let held = byKind.get(hit.kind);
    if (!held) { held = []; byKind.set(hit.kind, held); order.push(hit.kind); }
    held.push(hit);
  }
  return order.map(kind => ({ kind, hits: byKind.get(kind) ?? [] }));
};

const ReferencedBy = (props: ReferencedByProps) => {
  const { hits } = props;
  const { records } = useTesseraStrings();

  if (hits.length === 0) {
    return <Text variant="caption" className="referenced-by__empty">{records.notReferenced}</Text>;
  }

  return (
    <Box className="referenced-by">
      <Paragraph tone="dim" className="referenced-by__title">{records.referencedBy}</Paragraph>
      {groupByKind(hits).map((group) => (
        <Disclosure key={group.kind} summary={`${group.kind} (${group.hits.length})`} className="referenced-by__group">
          <Box as="ul" className="referenced-by__list">
            {group.hits.map((hit) => (
              <Box as="li" key={`${hit.id}.${hit.field}`} className="referenced-by__item">
                <Text
                  as="span"
                  className="referenced-by__link"
                  title={`${hit.kind}: ${hit.id}`}
                  data-id-ref={hit.id}
                  data-target-kind={hit.kind}
                >
                  {hit.label}
                </Text>
                <Text as="span" className="referenced-by__field">{records.via(hit.field)}</Text>
              </Box>
            ))}
          </Box>
        </Disclosure>
      ))}
    </Box>
  );
};

export { ReferencedBy };
