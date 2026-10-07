/* @layer stories @kind constants */
const SERVERS = {
  title: 'Servers',
  sentence: 'Could not load your servers.',
  raw: 'Could not read servers.json: unexpected end of input',
} as const;

const SESSIONS = {
  title: 'Sessions',
  sentence: 'Could not load your sessions.',
  raw: 'fetch http://127.0.0.1:7341/api/sessions failed: connect ECONNREFUSED 127.0.0.1:7341',
} as const;

const DEVICES = {
  title: 'Output device',
  description: 'Where the game sound plays.',
  sentence: 'Could not list the sound devices.',
  raw: 'NotAllowedError: enumerateDevices was blocked by the system sound settings',
} as const;

const LONG_RAW = [
  'TypeError: Cannot read properties of undefined (reading \'players\')',
  '    at parseSession (C:\\Users\\player\\AppData\\Local\\Archipelia\\resources\\app\\dist\\sessions\\parse-session.js:41:23)',
  '    at Array.map (<anonymous>)',
  '    at loadSessions (C:\\Users\\player\\AppData\\Local\\Archipelia\\resources\\app\\dist\\sessions\\load-sessions.js:18:30)',
  '    at async SessionStore.refresh (C:\\Users\\player\\AppData\\Local\\Archipelia\\resources\\app\\dist\\sessions\\session-store.js:77:19)',
  '    at async Promise.all (index 2)',
  '    at async bootstrap (C:\\Users\\player\\AppData\\Local\\Archipelia\\resources\\app\\dist\\main.js:112:5)',
  'Response body: {"sessions":[{"id":"friday-async","name":"Friday async","slots":null,"seed":"7f3a9c21d0e84b6f9a12c3d4e5f60718293a4b5c6d7e8f9012345678abcdef00"}]}',
].join('\n');

const RETRY_MS = 1600;

export { DEVICES, LONG_RAW, RETRY_MS, SERVERS, SESSIONS };
