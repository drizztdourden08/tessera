/* @layer renderer-components @kind component */
import { Span } from '../text-elements';
import { ListboxCount } from './ListboxCount';
import { ListboxTags } from './ListboxTags';
import { ListboxValueRow } from './ListboxValueRow';
import type { ListboxValueProps } from './listbox-view.type';

const ListboxValue = <T,>(props: ListboxValueProps<T>) => {
  const { displays, look, placeholder, tags = false } = props;
  const [only] = displays;
  if (only === undefined) return <Span className="listbox-value" tone="muted">{placeholder}</Span>;
  if (tags) return <ListboxTags displays={displays} />;
  if (displays.length > 1) return <ListboxCount displays={displays} />;
  const drawn = look.valueComponent !== undefined || look.valueDisplay === 'full';
  if (!drawn || only.item === undefined) return <Span className="listbox-value">{only.label}</Span>;
  return <ListboxValueRow item={only.item} look={look} />;
};

export { ListboxValue };
