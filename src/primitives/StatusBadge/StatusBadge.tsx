/* @layer renderer-components @kind component */
import './StatusBadge.css';
import { DEFAULT_LABELS, STATUS_CLASS, STATUS_CYCLE } from './StatusBadge.constants';
import type { StatusBadgeProps } from './StatusBadge.type';

const StatusBadge = ({ status, interactive = false, onChange, labels }: StatusBadgeProps) => {
  const key = status ?? 'unsaved';
  const className = STATUS_CLASS[key];
  const label = labels?.[key] ?? DEFAULT_LABELS[key];

  const handleClick = () => {
    if (!interactive || !onChange) return;
    const currentIdx = STATUS_CYCLE.indexOf(status);
    const nextIdx = (currentIdx + 1) % STATUS_CYCLE.length;
    onChange(STATUS_CYCLE[nextIdx]);
  };

  return (
    <span
      className={`status-badge ${className} ${interactive ? 'status-badge--interactive' : ''}`}
      onClick={interactive ? handleClick : undefined}
      title={interactive ? 'Click to cycle status' : `Status: ${label}`}
    >
      {label}
    </span>
  );
};

export { StatusBadge };
