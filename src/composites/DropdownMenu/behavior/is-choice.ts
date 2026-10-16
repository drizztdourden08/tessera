/* @layer renderer-components @kind util */
import type { MenuItemKind } from '../DropdownMenu.type';
import type { ChoiceMarkKind } from '../sub-components/ChoiceMark.type';

const isChoice = (kind: MenuItemKind): kind is ChoiceMarkKind => kind === 'check' || kind === 'radio';

export { isChoice };
