/* @layer renderer-components @kind types */
interface TooltipState {
  hover: boolean;
  focus: boolean;
  dismissed: boolean;
}

type TooltipEvent = 'enter' | 'leave' | 'press' | 'focus' | 'blur' | 'dismiss';

export type { TooltipEvent, TooltipState };
