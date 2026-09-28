/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FlexJustify, SpaceToken } from '../Flex';

interface ButtonRowProps {
  align?: FlexJustify;
  gap?: SpaceToken;
  className?: string;
  children: ReactNode;
}

export type { ButtonRowProps };
