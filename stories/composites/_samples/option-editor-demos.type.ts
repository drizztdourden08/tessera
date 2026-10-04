/* @layer stories @kind types */
import type { KeyValueEditorProps, KeyValueRecord } from '../../../src/composites';

interface KeyValueEditorDemoProps extends Partial<Omit<KeyValueEditorProps, 'value' | 'onChange'>> {
  start: KeyValueRecord;
}

interface FormGroupTabsDemoProps {
  tools?: boolean;
}

export type { FormGroupTabsDemoProps, KeyValueEditorDemoProps };
