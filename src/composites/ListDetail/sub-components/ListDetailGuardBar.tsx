/* @layer renderer-components @kind component */
import { useEffect, useId } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { ButtonRow } from '../../../primitives/ButtonRow';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ListDetailGuardProps } from '../ListDetail.type';
import { ListDetailGuardActions } from './ListDetailGuardActions';

const ListDetailGuardBar = (props: ListDetailGuardProps) => {
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
    <Box className="list-detail__guard" role="alertdialog" aria-label={lists.unsavedTitle} aria-describedby={messageId} onKeyDown={handleKeyDown}>
      <ButtonRow gap="xs" lead={<Text id={messageId} variant="body">{message}</Text>}>
        <ListDetailGuardActions {...props} size="sm" />
      </ButtonRow>
    </Box>
  );
};

export { ListDetailGuardBar };
