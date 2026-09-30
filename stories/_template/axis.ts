/* @layer stories @kind logic */
import type { DemonstratorAxis } from './Demonstrator.type';

const axis = <K extends string>(keys: readonly K[]): DemonstratorAxis<K>[] => keys.map((key) => ({ key, label: key }));

export { axis };
