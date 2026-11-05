/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { OverflowRowMoreProps } from '../OverflowRow.type';

const OverflowRowMore = (props: OverflowRowMoreProps) => {
  const { folded, label } = props;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <>
      <IconButton ref={buttonRef} label={label} aria-haspopup="true" aria-expanded={open} active={open} onClick={() => setOpen((current) => !current)}>
        <Icon name="ellipsis" />
      </IconButton>
      {open && (
        <Anchored anchorRef={buttonRef} placement="bottom-end" className="overflow-row__menu" role="group" aria-label={label} onDismiss={close}>
          {folded.map((item) => <Box key={item.id}>{item.menuNode ?? item.node}</Box>)}
        </Anchored>
      )}
    </>
  );
};

export { OverflowRowMore };
