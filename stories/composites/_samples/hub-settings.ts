/* @layer stories @kind data */
interface HubSetting {
  id: string;
  page: string;
  section: string;
  label: string;
  description?: string;
}

const HUB_SETTINGS: readonly HubSetting[] = [
  { id: 'restore', page: 'general', section: 'Startup', label: 'Open the last screen on launch' },
  { id: 'updates', page: 'general', section: 'Startup', label: 'Check for updates', description: 'Once a day, in the background.' },
  { id: 'login', page: 'general', section: 'Startup', label: 'Start with the system' },
  { id: 'tray', page: 'general', section: 'Tray', label: 'Show a tray icon' },
  { id: 'close-to-tray', page: 'general', section: 'Tray', label: 'Close to the tray' },
  { id: 'tray-badge', page: 'general', section: 'Tray', label: 'Show unread counts on the tray icon' },
  { id: 'reduce-motion', page: 'appearance', section: 'Motion', label: 'Reduce motion' },
  { id: 'animated-icons', page: 'appearance', section: 'Motion', label: 'Animate the nav icons' },
  { id: 'compact', page: 'appearance', section: 'Layout', label: 'Compact rows' },
  { id: 'sidebar', page: 'appearance', section: 'Layout', label: 'Open the side menu on launch' },
  { id: 'autosave', page: 'sessions', section: 'Saving', label: 'Save sessions on their own', description: 'Every five minutes.' },
  { id: 'archive', page: 'sessions', section: 'Saving', label: 'Keep the session archive' },
  { id: 'ask-close', page: 'sessions', section: 'Closing', label: 'Ask before closing a session' },
  { id: 'colours', page: 'players', section: 'List', label: 'Show player colours' },
  { id: 'joins', page: 'players', section: 'Alerts', label: 'Tell me when a player joins' },
  { id: 'bans', page: 'players', section: 'List', label: 'Hide banned players' },
];

export { HUB_SETTINGS };
export type { HubSetting };
