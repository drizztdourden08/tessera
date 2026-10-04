/* @layer tooling-scripts @kind types */
import type { ResolvedTesseraConfig } from './tessera-config.type.mjs';

/** The path of the first tessera.config.json in fromDir or above it, with forward slashes. */
declare const findTesseraConfig: (fromDir?: string) => string | undefined;

/**
 * Reads the first tessera.config.json in fromDir (default: the working folder) or above it.
 * Throws when the file is not valid JSON or breaks the schema, naming the key.
 */
declare const loadTesseraConfig: (fromDir?: string) => ResolvedTesseraConfig | undefined;

/**
 * A knip compiler for .ts files. In a Name.usage.ts file it adds the imports of the usage example as re-exports,
 * so a part or a name the example alone imports counts as used. Every other file comes back unchanged.
 * Needs typescript, read on the first usage file.
 */
declare const usageExampleImports: (text: string, filePath: string) => string;

export { findTesseraConfig, loadTesseraConfig, usageExampleImports };
export type { Folders, GuideUsage, PartKind, ResolvedTesseraConfig, TesseraAppSettings, TesseraConfigFile } from './tessera-config.type.mjs';
