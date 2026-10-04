/* @layer stories @kind data */
import type { Check } from '../../../src/composites';

const SERVER_CHECKS: readonly Check[] = [
  { id: 'connect', label: 'Connect over SSH', state: 'pass', detail: 'ap@nas.local:22, key C:\\Users\\ana\\.ssh\\id_ed25519' },
  { id: 'python', label: 'Python', state: 'pass', detail: '/usr/bin/python3 is 3.12.3' },
  { id: 'multiserver', label: 'MultiServer.py', state: 'pass', detail: '/opt/archipelago/MultiServer.py found' },
  { id: 'ap-version', label: 'Archipelago version', state: 'fail', detail: 'Archipelago 0.6.5, this app runs 0.6.7' },
  { id: 'game-port', label: 'Game port', state: 'fail', detail: 'port 38281 is in use' },
  { id: 'linger', label: 'Keep running after logout', state: 'warn', detail: 'lingering is off or systemd is missing, the server runs under nohup setsid' },
];

const RUNNING_CHECKS: readonly Check[] = [
  { id: 'connect', label: 'Connect over SSH', state: 'pass', detail: 'ap@95.217.40.12:22' },
  { id: 'python', label: 'Python', state: 'pending' },
  { id: 'multiserver', label: 'MultiServer.py', state: 'skip', detail: 'waits for Python' },
];

const ACTION_LABELS: Readonly<Record<string, string>> = {
  'ap-version': 'How to update',
  'game-port': 'Pick another port',
};

export { ACTION_LABELS, RUNNING_CHECKS, SERVER_CHECKS };
