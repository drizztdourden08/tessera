/* @layer renderer-components @kind types */
import type { ComponentPropsWithRef, HTMLAttributes, Ref } from 'react';
import type { Typesetting } from '../Text/behavior/text-style.type';
import type { TEXT_TONES } from './TextElement.constants';

type TextTag = keyof HTMLElementTagNameMap;

type TextTone = (typeof TEXT_TONES)[number];

interface TextLook extends Typesetting {
  tone?: TextTone;
}

type TextElementOwnProps<T extends TextTag> = Omit<ComponentPropsWithRef<T>, keyof TextLook> & TextLook;

type TextElementProps<T extends TextTag> = TextElementOwnProps<T> & { as: T };

interface AnyTextElementProps extends HTMLAttributes<HTMLElement>, TextLook {
  as: TextTag;
  ref?: Ref<HTMLElement>;
}

export type { AnyTextElementProps, TextElementOwnProps, TextElementProps, TextLook, TextTag, TextTone };
