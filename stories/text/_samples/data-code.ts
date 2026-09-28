/* @layer stories @kind data */
const TS_SAMPLE = `import type { SlotInfo } from './types';

const RETRY_DELAYS = [1000, 2000, 5000, 10000];

/** Reconnects a slot, backing off until the server answers. */
const reconnectSlot = async (slot: SlotInfo, attempt = 0): Promise<boolean> => {
  const socket = new WebSocket(\`wss://\${slot.host}:\${slot.port}\`);
  const opened = await new Promise<boolean>((resolve) => {
    socket.addEventListener('open', () => resolve(true), { once: true });
    socket.addEventListener('error', () => resolve(false), { once: true });
  });
  if (opened) return true;
  const delay = RETRY_DELAYS[Math.min(attempt, RETRY_DELAYS.length - 1)];
  await new Promise((wait) => setTimeout(wait, delay));
  return reconnectSlot(slot, attempt + 1);
};

export { reconnectSlot };
`;

const JSON_SAMPLE = `{
  "slot": 3,
  "name": "Tavi",
  "game": "Stardew Valley",
  "settings": {
    "deathLink": false,
    "itemsHandling": "remote",
    "hintCost": 10,
    "releaseMode": "goal"
  },
  "tags": ["async"],
  "checked": 141,
  "total": 309
}
`;

export { JSON_SAMPLE, TS_SAMPLE };
