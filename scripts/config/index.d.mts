/* @layer tooling-scripts @kind types */
import type { ResolvedTesseraConfig } from './tessera-config.type.mjs';

/** The path of the first tessera.config.json in fromDir or above it, with forward slashes. */
declare const findTesseraConfig: (fromDir?: string) => string | undefined;

/**
 * Reads the first tessera.config.json in fromDir (default: the working folder) or above it.
 * Throws when the file is not valid JSON or breaks the schema, naming the key.
 */
declare const loadTesseraConfig: (fromDir?: string) => ResolvedTesseraConfig | undefined;

export { findTesseraConfig, loadTesseraConfig };
export type { Folders, GuideUsage, PartKind, ResolvedTesseraConfig, TesseraAppSettings, TesseraConfigFile } from './tessera-config.type.mjs';
