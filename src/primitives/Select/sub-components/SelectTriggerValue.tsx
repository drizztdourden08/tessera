/* @layer renderer-components @kind component */
import { ListboxValue } from '../../listbox/ListboxValue';
import { Span } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { SelectTriggerProps } from './SelectTrigger.type';

const SelectTriggerValue = <T, V>({ select, setup, look }: SelectTriggerProps<T, V>) => {
  const { fields } = useTesseraStrings();
  if (look.mixed === true) return <Span tone="dim">{fields.mixed}</Span>;
  return (
    <ListboxValue
      displays={select.displays}
      look={setup}
      placeholder={look.placeholder ?? fields.selectPlaceholder}
      tags={setup.max > 1 && look.multiDisplay === 'tags'}
    />
  );
};

export { SelectTriggerValue };
