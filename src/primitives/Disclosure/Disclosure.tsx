/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { Icon } from '../Icon';
import { disclosureHandlers } from './behavior/disclosure-handlers';
import type { DisclosureProps } from './Disclosure.type';
import './Disclosure.css';

const Disclosure = (props: DisclosureProps) => {
  const { summary, end, wrapEnd = false, children, open, defaultOpen = false, onOpenChange, size = 'md', className, bodyClassName } = props;
  const { onToggle, onSummaryClick } = disclosureHandlers(open, onOpenChange);
  return (
    <Box as="details" open={open ?? defaultOpen} onToggle={onToggle} className={['disclosure', `disclosure--${size}`, end != null && 'disclosure--has-end', end != null && wrapEnd && 'disclosure--wrap-end', className].filter(Boolean).join(' ')}>
      <Box as="summary" className="disclosure__summary" onClick={onSummaryClick}>
        <Icon name="chevron-right" className="disclosure__chevron" aria-hidden />
        {summary}
        {end != null && <Box className="disclosure__end">{end}</Box>}
      </Box>
      <Box className={bodyClassName ? `disclosure__body ${bodyClassName}` : 'disclosure__body'}>{children}</Box>
    </Box>
  );
};

export { Disclosure };
