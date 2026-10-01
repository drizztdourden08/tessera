/* @layer stories @kind logic */
type ConnectionState = { status: 'idle' | 'testing' | 'ok' | 'failed'; message: string; target?: string };

const IDLE_CONNECTION: ConnectionState = { status: 'idle', message: '' };

const HOST_PORT = /^[\w.-]+:\d{2,5}$/;

const socketUrl = (server: string): string => (server.includes('://') ? server : `ws://${server}`);

const probeConnection = async (server: string, slot: string): Promise<ConnectionState> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });
  const url = socketUrl(server.trim());
  const target = `${server}|${slot}`;
  if (!HOST_PORT.test(server.trim())) return { status: 'failed', target, message: `Server pre-flight failed (invalid server URL: ${server.trim()})` };
  if (!server.includes('archipelago.gg')) return { status: 'failed', target, message: `Server pre-flight failed (connection refused: ${url})` };
  return { status: 'ok', target, message: `Connected to ${url} as ${slot.trim() || 'Player'}. The room has a slot for Relic of the Past.` };
};

export type { ConnectionState };
export { IDLE_CONNECTION, probeConnection };
