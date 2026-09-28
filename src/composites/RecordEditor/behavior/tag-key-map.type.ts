/* @layer renderer-components @kind types */
interface TagKeyMap {
  keyOfId: (id: string) => string;
  idOfKey: (key: string) => string | undefined;
}

export type { TagKeyMap };
