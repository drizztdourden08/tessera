/* @layer renderer-components @kind component */
import './Spinner.css';
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import { DEFAULT_LABEL } from './Spinner.constants';
import type { SpinnerProps } from './Spinner.type';

const Spinner = (props: SpinnerProps) => {
  const { size = 'md', label = DEFAULT_LABEL, className = '' } = props;
  const AppSpinner = useTesseraOverride('spinner');
  if (AppSpinner) return <AppSpinner size={size} label={label} className={className} />;
  return <span className={`spinner${className ? ` ${className}` : ''}`} data-size={size} role="status" aria-label={label} />;
};

export { Spinner };
