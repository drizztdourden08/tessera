/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef, HTMLAttributes, Ref } from 'react';
import type { Typesetting } from '../Text/behavior/text-style.type';

type TextTag = keyof HTMLElementTagNameMap;

type TextElementOwnProps<T extends TextTag> = Omit<ComponentPropsWithRef<T>, keyof Typesetting> & Typesetting;

type TextElementProps<T extends TextTag> = TextElementOwnProps<T> & { as: T };

interface AnyTextElementProps extends HTMLAttributes<HTMLElement>, Typesetting {
  as: TextTag;
  ref?: Ref<HTMLElement>;
}

export type { AnyTextElementProps, TextElementOwnProps, TextElementProps, TextTag };
