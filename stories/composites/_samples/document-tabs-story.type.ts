/* @layer stories @kind types */
type DocumentSet = 'three' | 'many' | 'unsaved' | 'none';

type DocumentTabsArgs = {
  documents: DocumentSet;
  menu: boolean;
  look: 'flat' | 'raised';
};

interface DocumentTabsDemoProps {
  documents?: DocumentSet;
  menu?: boolean;
  narrow?: boolean;
  showOrder?: boolean;
  look?: 'flat' | 'raised';
}

export type { DocumentSet, DocumentTabsArgs, DocumentTabsDemoProps };
