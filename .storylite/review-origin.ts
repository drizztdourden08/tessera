/* @layer root-config @kind logic */
const originOf = (url: string): string => {
  try {
    return new URL(url).origin;
  } catch {
    return '';
  }
};

const sameOrigin = (origin: string | undefined, serverUrls: readonly string[]): boolean =>
  Boolean(origin) && origin !== 'null' && serverUrls.some((url) => originOf(url) === origin);

export { sameOrigin };
