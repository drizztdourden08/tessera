/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Text } from '../../../primitives/Text';
import { Paragraph } from '../../../primitives/text-elements';
import { EMPTY, TITLE } from './ReferencedBy.constants';
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
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());

  if (hits.length === 0) {
    return <Text variant="caption" className="referenced-by__empty">{EMPTY}</Text>;
  }

  const toggle = (kind: string): void => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(kind)) next.delete(kind); else next.add(kind);
      return next;
    });
  };

  return (
    <Box className="referenced-by">
      <Paragraph tone="dim" className="referenced-by__title">{TITLE}</Paragraph>
      {groupByKind(hits).map((group) => (
        <Box key={group.kind} className="referenced-by__group">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="referenced-by__toggle"
            aria-expanded={expanded.has(group.kind)}
            onClick={() => toggle(group.kind)}
          >
            {group.kind} ({group.hits.length})
          </Button>
          {expanded.has(group.kind) && (
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
                  <Text as="span" className="referenced-by__field">via {hit.field}</Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export { ReferencedBy };
