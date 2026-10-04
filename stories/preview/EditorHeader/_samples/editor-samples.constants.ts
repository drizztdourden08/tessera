/* @layer stories @kind data */
const SAVE_DELAY = 900;

const PRESET_CONTEXT = ['A Link to the Past', 'Preset'] as const;

const SESSION_CONTEXT = ['3 players', 'Archipelago 0.6'] as const;

const DISK_FULL = 'The disk is full. Free some space and save again.';

const BACK_TO_PRESETS = { label: 'Presets', onSelect: () => undefined };

const BACK_TO_SESSIONS = { label: 'Sessions', onSelect: () => undefined };

export { BACK_TO_PRESETS, BACK_TO_SESSIONS, DISK_FULL, PRESET_CONTEXT, SAVE_DELAY, SESSION_CONTEXT };
