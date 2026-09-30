/* @layer renderer-components @kind component */
import { ListboxCount } from './ListboxCount';
import { ListboxValueRow } from './ListboxValueRow';
import type { ListboxValueProps } from './listbox-view.type';

const ListboxValue = <T,>(props: ListboxValueProps<T>) => {
  const { displays, look, placeholder } = props;
  const [only] = displays;
  if (only === undefined) return <span className="listbox-value listbox-value--placeholder">{placeholder}</span>;
  if (displays.length > 1) return <ListboxCount displays={displays} />;
  const drawn = look.valueComponent !== undefined || look.valueDisplay === 'full';
  if (!drawn || only.item === undefined) return <span className="listbox-value">{only.label}</span>;
  return <ListboxValueRow item={only.item} look={look} />;
};

export { ListboxValue };
