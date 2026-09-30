/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type BadgeVariant = 'inline' | 'number' | 'dot';

type BadgeColor = 'tame' | 'normal' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary';

type BadgeAnchor = 'top-end' | 'bottom-end' | 'top-start' | 'bottom-start';

type BadgeSymbol =
  | ' ' | '\t' | '\n' | '!' | '"' | '#' | '$' | '%' | '&' | "'" | '(' | ')' | '*' | ',' | '-' | '.' | '/' | ':' | ';'
  | '<' | '=' | '>' | '?' | '@' | '[' | '\\' | ']' | '^' | '_' | '`' | '{' | '|' | '}' | '~';

type BadgeOverflow<S extends string> = S extends `${infer Head}+${infer Tail}`
  ? (Head extends '' ? never : Tail extends '' ? S : never)
  : S;

type BadgeText<S extends string> = S extends '' | `${string}${BadgeSymbol}${string}` ? never : BadgeOverflow<S>;

type BadgeValue<S extends string> = number | BadgeText<S>;

interface BadgeLook {
  color?: BadgeColor;
  translucent?: boolean;
  label?: string;
  className?: string;
}

interface BadgeCount<S extends string> extends BadgeLook {
  value: BadgeValue<S>;
  max?: number;
}

interface BadgeInlineProps<S extends string> extends BadgeCount<S> {
  variant: 'inline';
  anchor?: never;
  children?: never;
}

interface BadgeNumberProps<S extends string> extends BadgeCount<S> {
  variant?: 'number';
  anchor?: BadgeAnchor;
  children?: ReactNode;
}

interface BadgeDotProps extends BadgeLook {
  variant: 'dot';
  value?: never;
  max?: never;
  anchor?: BadgeAnchor;
  children?: ReactNode;
}

type BadgeProps<S extends string = string> = BadgeInlineProps<S> | BadgeNumberProps<S> | BadgeDotProps;

export type { BadgeAnchor, BadgeColor, BadgeProps, BadgeText, BadgeValue, BadgeVariant };
