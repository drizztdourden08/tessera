/* @layer renderer-design-system @kind types */
// Side-effect CSS imports (`import './X.css'`) are handled by the consumer's bundler.
declare module '*.css';

// react-color's ES build carries no types of its own; it is the same code as `lib/`, which is typed.
declare module 'react-color/es/components/common/ColorWrap' {
  export { default } from 'react-color/lib/components/common/ColorWrap';
}
declare module 'react-color/es/components/common/Saturation' {
  export { default } from 'react-color/lib/components/common/Saturation';
}
declare module 'react-color/es/components/common/Hue' {
  export { default } from 'react-color/lib/components/common/Hue';
}
declare module 'react-color/es/components/common/Alpha' {
  export { default } from 'react-color/lib/components/common/Alpha';
}

interface ImportMetaEnv {
  readonly DEV?: boolean;
}

interface ImportMetaGlobOptions {
  eager: true;
  query?: string;
  import?: string;
}

interface ImportMeta {
  readonly env?: ImportMetaEnv;
  readonly glob: <T>(pattern: string | readonly string[], options: ImportMetaGlobOptions) => Record<string, T>;
}
