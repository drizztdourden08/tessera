/* @layer renderer-components @kind component */
import { Fragment, useId } from 'react';
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { MenuNodes } from './MenuNodes';
import type { MenuGroupsProps } from './MenuGroups.type';

const MenuGroups = (props: MenuGroupsProps) => {
  const baseId = useId();
  return (
    <>
      {props.groups.map((group, index) => {
        const labelId = group.label ? `${baseId}-${group.id}` : undefined;
        return (
          <Fragment key={group.id}>
            {index > 0 && <Box role="separator" className="dropdown__separator" />}
            <Box role="group" aria-labelledby={labelId} className="dropdown__group">
              {labelId && <Span id={labelId} className="dropdown__group-label">{group.label}</Span>}
              <MenuNodes nodes={group.items} />
            </Box>
          </Fragment>
        );
      })}
    </>
  );
};

export { MenuGroups };
