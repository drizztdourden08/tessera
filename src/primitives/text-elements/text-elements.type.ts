/* @layer renderer-components @kind types */
import type { ReactElement } from 'react';
import type { TextElementOwnProps, TextTag } from '../TextElement';
import type { TEXT_ELEMENT_SPECS } from './text-element-specs.constants';

type TextElementComponent<T extends TextTag> = ((props: TextElementOwnProps<T>) => ReactElement) & { displayName?: string };

type TextElementSpec = (typeof TEXT_ELEMENT_SPECS)[number];

type TextMembers = {
  [S in TextElementSpec as S['name'] | S['short']]: TextElementComponent<S['tag']>;
};

export type { TextElementComponent, TextElementSpec, TextMembers };
