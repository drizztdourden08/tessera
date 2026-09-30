/* @layer stories @kind types */
interface TokenValueProps {
  token: string;
  format?: (declared: string) => string;
}

export type { TokenValueProps };
