/* @layer stories @kind component */
import type { SyntheticEvent } from 'react';
import { Box, Icon } from '../../../src/primitives';
import type { DisclosureProps } from './Disclosure.type';
import './Disclosure.css';

const Disclosure = (props: DisclosureProps) => {
  const { summary, children, defaultOpen = false, onOpenChange, size = 'md', className } = props;
  const toggled = onOpenChange
    ? (event: SyntheticEvent<HTMLElement>) => onOpenChange((event.currentTarget as HTMLDetailsElement).open)
    : undefined;
  return (
    <Box as="details" open={defaultOpen} onToggle={toggled} className={['disclosure', `disclosure--${size}`, className].filter(Boolean).join(' ')}>
      <Box as="summary" className="disclosure__summary">
        <Icon name="chevron-right" className="disclosure__chevron" aria-hidden />
        {summary}
      </Box>
      <Box className="disclosure__body">{children}</Box>
    </Box>
  );
};

export { Disclosure };
