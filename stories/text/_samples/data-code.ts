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

const DIAGNOSTICS_SAMPLE = `Hollow Tracker debug info
Version: 1.4.0
Runtime: Electron 38.1.0
Engine: Chromium 140.0.7339.80
Platform: windows (host electron, os win32)
Form factor: desktop, input: mouse, dev: no

[Recent log]
19:02:11 INFO [boot] window ready in 412 ms
19:02:14 WARN [updater] feed answered 503, retrying in 30 seconds
19:04:02 ERROR [tracker] save failed: EBUSY: resource busy or locked, open 'C:\\Users\\wren\\AppData\\Roaming\\Hollow Tracker\\profiles\\wren.json'

[System]
CPU: AMD Ryzen 7 5800X3D, 16 threads
Memory: 31.9 GB, 18.2 GB free
GPU: NVIDIA GeForce RTX 3070

[Window]
Size: 1600 x 900, scale 1.25
Displays: 2

[User agent]
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HollowTracker/1.4.0 Chrome/140.0.7339.80 Electron/38.1.0 Safari/537.36
`;

export { DIAGNOSTICS_SAMPLE, JSON_SAMPLE, TS_SAMPLE };
