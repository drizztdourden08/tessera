import type { ServerEntry, Session } from '@archipelia/model';

const NOW = Date.now();
const SEED = '48213907715260934413';

const SERVERS: ServerEntry[] = [
  {
    id: 'srv1', label: 'Home NAS', host: 'nas.local', port: 22, gamePort: 38281, apPath: '/opt/archipelago',
    auth: { kind: 'ssh-key', username: 'ap', keyPath: String.raw`C:\Users\ana\.ssh\id_ed25519` },
    hostKeySha256: 'SHA256:q3Vb8m2Tz9kXc4LJ0Wf7pY1nRrE6aHs5dGuKxN2oQeM',
    lastTest: {
      at: NOW - 600000, ok: false, message: 'Connected, but 2 of 5 checks failed.',
      checks: [
        { name: 'python', ok: true, detail: '/usr/bin/python3 is 3.12.3' },
        { name: 'multiserver', ok: true, detail: '/opt/archipelago/MultiServer.py found' },
        { name: 'ap-version', ok: false, detail: 'Archipelago 0.6.5, this app runs 0.6.7' },
        { name: 'game-port', ok: false, detail: 'port 38281 is in use' },
        { name: 'linger', ok: false, advisory: true, detail: 'lingering is off or systemd is missing, the server runs under nohup setsid' },
      ],
    },
  },
  {
    id: 'srv2', label: 'Hetzner VPS', host: '95.217.40.12', port: 22, gamePort: 38281, apPath: '/home/ap/Archipelago',
    auth: { kind: 'ssh-password', username: 'ap', passwordRef: 'srv2-password' },
    lastTest: { at: NOW - 86400000, ok: true, message: 'Ready to host.' },
  },
  {
    id: 'srv3', label: 'Bram\'s server', host: 'bram.duckdns.org', port: 2222, gamePort: 40000, apPath: '/srv/archipelago',
    auth: { kind: 'ssh-key', username: 'bram', keyPath: '' },
  },
];

const SESSION: Session = {
  id: 's1', status: 'hosting', createdAt: NOW - 2520000, seed: SEED,
  snapshot: {
    id: 't1', name: 'Friday run', updatedAt: NOW,
    players: [
      { slot: 1, name: 'Ana', game: 'Timespinner', source: { kind: 'preset', presetId: 'p1', overrides: {} } },
      { slot: 2, name: 'Bram', game: 'A Link to the Past', source: { kind: 'preset', presetId: 'p2', overrides: {} } },
      { slot: 3, name: 'Cleo', game: 'Hollow Knight', source: { kind: 'yaml', fileName: 'Cleo_HK.yaml', yaml: 'x' } },
    ],
    generator: { spoiler: 2, race: false, progressionBalancing: true },
    server: { hintCost: 10, releaseMode: 'auto', collectMode: 'auto', remainingMode: 'goal', autoShutdownMinutes: 0 },
    host: { kind: 'local', port: 38281 },
  },
  endpoint: { host: 'localhost', port: 38281 },
  output: {
    zip: String.raw`C:\Users\ana\AppData\Roaming\Archipelia\Data\runs\friday-run\AP_` + `${SEED}.zip`,
    files: [`AP_${SEED}.archipelago`, `AP_${SEED}_P1_Ana.aptimespinner`, `AP_${SEED}_P2_Bram.aplttp`, `AP_${SEED}_Spoiler.txt`],
    generateLog: '',
  },
};

export { NOW, SEED, SERVERS, SESSION };
