/* @layer stories @kind data */
type ProviderParts = {
  spinner: boolean;
  writeText: boolean;
  link: boolean;
  imagePlaceholder: boolean;
  strings: boolean;
  errorFallback: boolean;
  emptyArt: boolean;
  icons: boolean;
};

const PART_NOTES: Readonly<Record<keyof ProviderParts, string>> = {
  spinner: 'The app spinner, in every Spinner, Button, field and portaled dialog.',
  writeText: 'The app clipboard writer behind every copy button.',
  link: 'The app link (a router link) behind every href Tessera renders.',
  imagePlaceholder: 'The loading, broken and empty art of Image and Thumbnail.',
  strings: 'A partial French table over the English defaults.',
  errorFallback: 'The app crash screen in every ErrorBoundary.',
  emptyArt: 'The app picture in every EmptyState that names no icon.',
  icons: 'An icon set that swaps some Icon names for Phosphor duotone.',
};

const ALL_PARTS: ProviderParts = {
  spinner: true, writeText: true, link: true, imagePlaceholder: true, strings: true, errorFallback: true, emptyArt: true, icons: true,
};

export { ALL_PARTS, PART_NOTES };
export type { ProviderParts };
