/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { FieldControlContext } from '../../../primitives/field-control/field-control-context';
import { HintLine } from '../../../primitives/HintLine';
import { useHint } from '../../../primitives/hint/useHint';
import { useRowPointed } from '../behavior/useRowPointed';
import { COMPACT_CONTROL } from '../SettingsRow.constants';
import type { SettingsRowControlProps } from './SettingsRowControl.type';

const SettingsRowControl = (props: SettingsRowControlProps) => {
  const { bubble, current, children } = props;
  const anchorRef = useRef<HTMLDivElement>(null);
  const { pointed, handlers } = useRowPointed();
  const shown = useHint() ?? (pointed ? current : undefined);
  if (!bubble) return <Box className="settings-row__control">{children}</Box>;
  return (
    <Box ref={anchorRef} className="settings-row__control" {...handlers}>
      <FieldControlContext.Provider value={COMPACT_CONTROL}>{children}</FieldControlContext.Provider>
      {shown !== undefined && (
        <Anchored anchorRef={anchorRef} placement="bottom-end" layer="tooltip" className="settings-row__bubble">
          <HintLine hint={shown} lines={1} />
        </Anchored>
      )}
    </Box>
  );
};

export { SettingsRowControl };
