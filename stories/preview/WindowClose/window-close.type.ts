/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../../src/primitives';

type ClosePlace = 'today' | 'row' | 'pill' | 'corner' | 'header';

type CloseLook = 'float' | 'joined' | 'corner' | 'header';

interface CloseButtonProps {
  look: CloseLook;
  onClose: () => void;
}

interface HubContentProps {
  close?: ReactNode;
}

interface HubWindowProps {
  place: ClosePlace;
}

interface TitlelessWindowProps {
  title: string;
  onClose: () => void;
  floating: ReactNode;
  hidden: boolean;
  children: ReactNode;
}

interface DataPage {
  id: string;
  label: string;
  icon: IconName;
  group?: string;
}

export type { CloseButtonProps, CloseLook, ClosePlace, DataPage, HubContentProps, HubWindowProps, TitlelessWindowProps };
