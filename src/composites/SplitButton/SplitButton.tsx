/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import { ButtonGroup } from '../../primitives/ButtonGroup';
import { Icon } from '../../primitives/Icon';
import { IconButton } from '../../primitives/IconButton';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { chevronSizeOf } from './behavior/chevron-size-of';
import { SplitButtonMain } from './sub-components/SplitButtonMain';
import { SplitButtonPopup } from './sub-components/SplitButtonPopup';
import './SplitButton.css';
import type { SplitButtonProps } from './SplitButton.type';

const SplitButton = (props: SplitButtonProps) => {
  const { label, items, panel, onClick, icon, iconOnly, shortcut, variant = 'secondary', size = 'md', pressed, disabled, menuLabel, className } = props;
  const { common } = useTesseraStrings();
  const chevronRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = (): void => setOpen(false);

  return (
    <>
      <ButtonGroup aria-label={label} className={['split-button', className].filter(Boolean).join(' ')}>
        <SplitButtonMain
          label={label}
          icon={icon}
          iconOnly={iconOnly}
          shortcut={shortcut}
          variant={variant}
          size={size}
          pressed={pressed}
          disabled={disabled}
          onClick={onClick}
        />
        <IconButton
          ref={chevronRef}
          variant={variant}
          size={chevronSizeOf(size)}
          label={menuLabel ?? common.options}
          disabled={disabled}
          aria-haspopup={panel === undefined ? 'menu' : 'dialog'}
          aria-expanded={open}
          aria-controls={open && panel !== undefined ? panelId : undefined}
          className="split-button__chevron"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
        >
          <Icon name="chevron-down" />
        </IconButton>
      </ButtonGroup>
      {open && (
        <SplitButtonPopup id={panelId} anchorRef={chevronRef} label={menuLabel ?? common.options} items={items} panel={panel} onClose={close} />
      )}
    </>
  );
};

export { SplitButton };
