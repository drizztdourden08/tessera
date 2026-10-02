/* @layer tooling-scripts @kind types */

/**
 * Runs a tessera command, the same as the `tessera` bin, and resolves to its exit code.
 * args are the words after `tessera`, such as ['new', 'compound', 'SaveSlot', '--yes'].
 * cwd is where the command runs (default: the working folder); tessera.config.json is found from there.
 */
declare const runTessera: (args: readonly string[], options?: { cwd?: string }) => Promise<number>;

export { runTessera };
