/* @layer renderer-components @kind types */
type ScreenStatus = 'draft' | 'mapped' | 'verified' | undefined;

interface StatusBadgeProps {
  status: ScreenStatus;
  interactive?: boolean;
  onChange?: (status: ScreenStatus) => void;
  labels?: Partial<Record<'unsaved' | NonNullable<ScreenStatus>, string>>;
}

export type { ScreenStatus, StatusBadgeProps };
