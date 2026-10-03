/* @layer tooling-scripts @kind types */
type PartKind = 'primitives' | 'composites' | 'compounds' | 'views';

type AiUsage = 'report' | 'enforce';

type Folders = string | readonly string[];

interface TesseraAppSettings {
  parts?: Partial<Record<PartKind, Folders>>;
  /** The @layer tag tessera new writes in the files of an app part, such as renderer-shell. */
  layer?: string;
  stories?: string;
  theme?: { css?: string; palette?: string };
  ai?: { usage?: AiUsage; out?: string; tree?: string; tsconfig?: string };
  gallery?: { title?: string; port?: number; review?: string };
  overrides?: string;
}

interface TesseraConfigFile extends TesseraAppSettings {
  $schema?: string;
  package?: string;
  apps?: Record<string, TesseraAppSettings>;
}

interface ResolvedTesseraConfig {
  /** The absolute path of the tessera.config.json that was read. */
  file: string;
  /** The folder of that file. Every path below is absolute, with forward slashes. */
  root: string;
  /** The app folder when the search started inside an apps entry; its settings are merged in. */
  app?: string;
  package?: string;
  /** Each kind as a list of folders or globs, src/<kind> when unset. */
  parts: Record<PartKind, string[]>;
  /** The @layer tag of new app parts, renderer-app when unset. */
  layer: string;
  stories: string;
  theme: { css: string; palette?: string };
  ai: { usage: AiUsage; out: string; tree?: string; tsconfig?: string };
  gallery?: { title?: string; port?: number; review?: string };
  overrides?: string;
  /** The folder of every apps entry. */
  apps: string[];
}

export type { AiUsage, Folders, PartKind, ResolvedTesseraConfig, TesseraAppSettings, TesseraConfigFile };
