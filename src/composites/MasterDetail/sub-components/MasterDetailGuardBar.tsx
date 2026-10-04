/* @layer renderer-components @kind component */
import { useEffect, useId } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { MasterDetailGuardProps } from '../MasterDetail.type';
import { MasterDetailGuardActions } from './MasterDetailGuardActions';

const MasterDetailGuardBar = (props: MasterDetailGuardProps) => {
  const { open, message, onStay, stayRef, saving } = props;
  const { lists } = useTesseraStrings();
  const messageId = useId();
  useEffect(() => {
    if (!open) return undefined;
    const before = stayRef.current?.ownerDocument.activeElement as HTMLElement | null | undefined;
    stayRef.current?.focus();
    return () => {
      if (before?.isConnected) before.focus();
    };
  }, [open, stayRef]);
  if (!open) return null;
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Escape' || saving) return;
    event.stopPropagation();
    onStay();
  };
  return (
    <Box className="master-detail-guard" role="alertdialog" aria-label={lists.unsavedTitle} aria-describedby={messageId} onKeyDown={handleKeyDown}>
      <Text id={messageId} variant="body" className="master-detail-guard__message">{message}</Text>
      <Box className="master-detail-guard__actions">
        <MasterDetailGuardActions {...props} size="sm" />
      </Box>
    </Box>
  );
};

export { MasterDetailGuardBar };
