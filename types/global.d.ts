/* @layer renderer-design-system @kind types */
// Side-effect CSS imports (`import './X.css'`) are handled by the consumer's bundler.
declare module '*.css';

interface ImportMetaEnv {
  readonly DEV?: boolean;
}

interface ImportMetaGlobOptions {
  eager: true;
  query?: string;
  import?: string;
}

interface ImportMetaLazyGlobOptions {
  eager?: false;
  query?: string;
  import?: string;
}

interface ImportMeta {
  readonly env?: ImportMetaEnv;
  readonly glob: {
    <T>(pattern: string | readonly string[], options: ImportMetaGlobOptions): Record<string, T>;
    <T>(pattern: string | readonly string[], options?: ImportMetaLazyGlobOptions): Record<string, () => Promise<T>>;
  };
}
