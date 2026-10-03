/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FlexJustify, SpaceToken } from '../Flex';

type ButtonRowVariant = 'plain' | 'bar';

interface ButtonRowProps {
  align?: FlexJustify;
  gap?: SpaceToken;
  variant?: ButtonRowVariant;
  lead?: ReactNode;
  className?: string;
  children: ReactNode;
}

export type { ButtonRowProps, ButtonRowVariant };
