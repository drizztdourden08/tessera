/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import { FIELD_KIND_ICONS } from '../behavior/field-kind-icons.constants';
import type { FieldKindIconProps } from './FieldKindIcon.type';
import './FieldKindIcon.css';

const FieldKindIcon = ({ kind }: FieldKindIconProps) => (
  <Span className="filter-bar__kind" data-kind={kind} aria-hidden>
    <Icon name={FIELD_KIND_ICONS[kind]} />
  </Span>
);

export { FieldKindIcon };
