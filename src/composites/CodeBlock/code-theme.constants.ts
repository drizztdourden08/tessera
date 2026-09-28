/* @layer renderer-components @kind data */
import type { PrismTheme } from 'prism-react-renderer';

const CODE_THEME: PrismTheme = {
  plain: {
    color: 'var(--c-text)',
    backgroundColor: 'var(--c-sunken)',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: 'var(--c-text-muted)', fontStyle: 'italic' },
    },
    {
      types: ['punctuation', 'operator', 'entity', 'url', 'variable'],
      style: { color: 'var(--c-text-dim)' },
    },
    {
      types: ['string', 'char', 'attr-value', 'inserted'],
      style: { color: 'var(--c-secondary-bright)' },
    },
    {
      types: ['keyword', 'tag', 'builtin', 'atrule', 'important'],
      style: { color: 'var(--c-primary-bright)' },
    },
    {
      types: ['boolean', 'number', 'constant', 'symbol', 'deleted'],
      style: { color: 'var(--c-warning)' },
    },
    {
      types: ['function', 'class-name', 'property', 'attr-name'],
      style: { color: 'var(--c-info)' },
    },
  ],
};

export { CODE_THEME };
