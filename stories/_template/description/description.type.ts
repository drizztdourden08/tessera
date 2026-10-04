/* @layer stories @kind types */
import type { ShortcutKey } from '../../../src/primitives';

type MarkupToken =
  | { kind: 'text'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'strong'; children: readonly MarkupToken[] }
  | { kind: 'em'; children: readonly MarkupToken[] }
  | { kind: 'keys'; keys: readonly ShortcutKey[] }
  | { kind: 'page'; name: string; path: string }
  | { kind: 'link'; text: string; href: string };

interface MarkupProps {
  text: string;
}

interface MarkupLinkProps {
  text: string;
  href: string;
}

interface MarkupPieceProps {
  token: MarkupToken;
}

interface OverviewHeadProps {
  name: string;
  description: string;
  points: readonly string[];
  instead: string | null;
}

type DescriptionCheckMode = 'report' | 'enforce';

export type { DescriptionCheckMode, MarkupLinkProps, MarkupPieceProps, MarkupProps, MarkupToken, OverviewHeadProps };
