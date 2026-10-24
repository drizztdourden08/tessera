/* @layer stories @kind constants */
interface TileEntry {
  id: string;
  name: string;
}

const tilesOf = (count: number): readonly TileEntry[] =>
  Array.from({ length: count }, (_, at) => ({ id: `tile-${at}`, name: `${at + 1}` }));

export type { TileEntry };
export { tilesOf };
