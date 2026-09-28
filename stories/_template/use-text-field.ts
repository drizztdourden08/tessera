/* @layer stories @kind hook */
import { useState } from 'react';

interface StatefulTextProps {
  initial: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

interface TextField {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange: (event: { target: { value: string } }) => void;
}

const useTextField = (props: StatefulTextProps): TextField => {
  const { initial, placeholder, disabled, readOnly } = props;
  const [value, setValue] = useState(initial);
  return { value, placeholder, disabled, readOnly, onChange: (event) => setValue(event.target.value) };
};

export { useTextField };
export type { StatefulTextProps };
