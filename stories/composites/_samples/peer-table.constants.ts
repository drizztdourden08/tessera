/* @layer stories @kind data */
import type { PeerRow } from './data-peers';

const PEER_COUNT: readonly [string, string] = ['peer', 'peers'];
const PEER_GROUP_BY: readonly string[] = ['state'];
const PEER_VIRTUAL_FROM = 100;

const peerId = (peer: PeerRow): string => peer.id;

export { PEER_COUNT, PEER_GROUP_BY, PEER_VIRTUAL_FROM, peerId };
