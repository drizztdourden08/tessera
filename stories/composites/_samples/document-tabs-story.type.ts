/* @layer stories @kind types */
type DocumentSet = 'three' | 'many' | 'none';

type DocumentTabsArgs = {
  documents: DocumentSet;
  menu: boolean;
};

interface DocumentTabsDemoProps {
  documents?: DocumentSet;
  menu?: boolean;
  narrow?: boolean;
  showOrder?: boolean;
}

export type { DocumentSet, DocumentTabsArgs, DocumentTabsDemoProps };
