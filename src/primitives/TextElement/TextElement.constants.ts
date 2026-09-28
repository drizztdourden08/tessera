/* @layer renderer-components @kind constants */
const QUIET_TONES = ['dim', 'muted'] as const;
const ACCENT_TONES = ['primary', 'secondary', 'tertiary'] as const;
const STATUS_TONES = ['success', 'warning', 'danger', 'info'] as const;
const TEXT_TONES = [...QUIET_TONES, ...ACCENT_TONES, ...STATUS_TONES] as const;

export { ACCENT_TONES, QUIET_TONES, STATUS_TONES, TEXT_TONES };
