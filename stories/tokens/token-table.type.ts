/* @layer stories @kind types */
type TableSpecimen = 'size' | 'margin' | 'padding' | 'gap' | 'radius';

type TableColumn = 'value' | 'step' | 'sample';

interface TokenEntry {
  token: string;
}

interface TokenTableProps {
  entries: readonly TokenEntry[];
  specimen: TableSpecimen;
  showStep?: boolean;
}

interface TokenSampleProps {
  token: string;
  specimen: TableSpecimen;
}

export type { TableColumn, TokenEntry, TokenSampleProps, TokenTableProps };
