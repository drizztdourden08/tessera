/* @layer renderer-components @kind types */
import type { ReactElement } from 'react';
import type { Typesetting } from '../Text/behavior/text-style.type';
import type { TextElementNativeProps, TextTag } from '../TextElement';
import type { TEXT_ELEMENT_SPECS } from './text-element-specs.constants';

type TextElementSpec = (typeof TEXT_ELEMENT_SPECS)[number];

type ToneProp<Tone> = [Tone] extends [never] ? unknown : { tone?: Tone };

type SpecLook<S extends TextElementSpec> = Pick<Typesetting, S['looks'][number]> & ToneProp<S['tones'][number]>;

type TextElementComponent<T extends TextTag, Look = unknown> =
  ((props: TextElementNativeProps<T> & Look) => ReactElement) & { displayName?: string };

type TextMembers = {
  [S in TextElementSpec as S['name'] | S['short']]: TextElementComponent<S['tag'], SpecLook<S>>;
};

export type { TextElementComponent, TextElementSpec, TextMembers };
