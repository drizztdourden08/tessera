/* @layer renderer-components @kind data */
import type { ButtonVariant } from '../../primitives/Button/Button.type';
import type { ActionKind } from './ActionBar.type';

const KIND_VARIANT: Readonly<Record<ActionKind, ButtonVariant>> = {
  primary: 'primary',
  default: 'secondary',
  danger: 'danger',
};

const FIT_SLACK = 1;

const MORE_CLASS = 'action-bar__more';

const ACTION_ID_ATTRIBUTE = 'data-action-id';

export { ACTION_ID_ATTRIBUTE, FIT_SLACK, KIND_VARIANT, MORE_CLASS };
