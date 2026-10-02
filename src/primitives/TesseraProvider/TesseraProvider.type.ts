/* @layer renderer-components @kind types */
import type { ComponentType, ReactNode } from 'react';
import type { IconSet } from '../Icon/Icon.type';
import type { ImagePlaceholderProps } from '../Image/Image.type';
import type { SpinnerProps } from '../Spinner/Spinner.type';
import type { TesseraStrings, TesseraStringsOverride } from '../strings/tessera-strings.type';

type ClipboardWriter = (text: string) => Promise<void> | void;

interface ErrorFallbackProps {
  error: unknown;
  label: string;
  action?: ReactNode;
  reset: () => void;
  className?: string;
}

interface TesseraOverrides {
  spinner?: ComponentType<SpinnerProps>;
  writeText?: ClipboardWriter;
  imagePlaceholder?: ComponentType<ImagePlaceholderProps>;
  strings?: TesseraStringsOverride;
  errorFallback?: ComponentType<ErrorFallbackProps>;
  emptyArt?: ReactNode;
  portalDocument?: Document;
  icons?: IconSet;
}

type TesseraPart = keyof TesseraOverrides;

type TesseraSetup = Omit<TesseraOverrides, 'strings'> & { strings: TesseraStrings };

interface TesseraProviderProps {
  overrides: TesseraOverrides;
  children?: ReactNode;
}

export type { ClipboardWriter, ErrorFallbackProps, TesseraOverrides, TesseraPart, TesseraProviderProps, TesseraSetup };
