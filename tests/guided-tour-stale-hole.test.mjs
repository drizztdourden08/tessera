/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { bubblePlace } from '../src/composites/GuidedTour/behavior/bubble-place';
import { mascotSpot } from '../src/composites/GuidedTour/behavior/mascot-spot';
import { scrollToTarget } from '../src/composites/GuidedTour/behavior/scroll-to-target';
import { useSpotHoles } from '../src/composites/GuidedTour/behavior/useSpotHoles';
import { MASCOT_BOX, MASCOT_GAP, SETTLE_FRAMES, SETTLE_LIMIT } from '../src/composites/GuidedTour/GuidedTour.constants';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const VIEW = { width: 1280, height: 720 };
const BUBBLE = { width: 320, height: 180 };
const NONE = [];
const ring = { current: null };

const fakeView = () => {
  const frames = [];
  const quiet = { addEventListener: () => undefined, removeEventListener: () => undefined };
  const doc = { ...quiet, body: {} };
  const view = {
    ...quiet,
    document: doc,
    innerWidth: VIEW.width,
    innerHeight: VIEW.height,
    requestAnimationFrame: (callback) => frames.push(callback),
    cancelAnimationFrame: () => undefined,
  };
  doc.defaultView = view;
  doc.body.ownerDocument = doc;
  const flush = () => frames.splice(0).forEach((frame) => frame());
  return { doc, frames, flush };
};

const nodeIn = (doc, rect) => ({
  ownerDocument: doc,
  isConnected: true,
  rect,
  scrollIntoView: vi.fn(),
  getBoundingClientRect() { return this.rect; },
});

const rectOf = (left, top, width, height) => ({ left, top, width, height });

const PLAYERS = rectOf(328, 305, 922, 900);
const CONNECTION = rectOf(770, 313, 420, 259);

const holeAround = ({ left, top, width, height }) => ({ x: left, y: top, width, height, radius: 0 });

describe('a tall step, then a normal one', () => {
  it('lights the second target on the second step, not the hole of the first', () => {
    const { doc, flush } = fakeView();
    const players = nodeIn(doc, PLAYERS);
    const connection = nodeIn(doc, CONNECTION);
    let target = players;
    let settled = '0 lobby-players';
    const hook = mountHook(() => useSpotHoles(target, NONE, ring, settled));
    flush();
    expect(hook.current.hole).toEqual(holeAround(PLAYERS));
    target = connection;
    settled = '1 lobby-connection';
    hook.rerender(() => useSpotHoles(target, NONE, ring, settled));
    expect(hook.current.hole).toEqual(holeAround(CONNECTION));
    flush();
    hook.act(() => undefined);
    expect(hook.current.hole).toEqual(holeAround(CONNECTION));
  });

  it('follows the target when it moves after the step shows, without a resize or a scroll', () => {
    const { doc, flush } = fakeView();
    const connection = nodeIn(doc, CONNECTION);
    const hook = mountHook(() => useSpotHoles(connection, NONE, ring, '1 lobby-connection'));
    flush();
    flush();
    connection.rect = rectOf(770, 413, 420, 259);
    flush();
    hook.act(() => undefined);
    expect(hook.current.hole).toEqual(holeAround(connection.rect));
  });

  it('stops measuring once the hole holds still', () => {
    const { doc, frames, flush } = fakeView();
    mountHook(() => useSpotHoles(nodeIn(doc, CONNECTION), NONE, ring, '1 lobby-connection'));
    for (let at = 0; at < SETTLE_FRAMES; at += 1) flush();
    expect(frames).toHaveLength(0);
  });

  it('gives up after a bounded number of frames when the target never holds still', () => {
    const { doc, frames, flush } = fakeView();
    const target = nodeIn(doc, CONNECTION);
    mountHook(() => useSpotHoles(target, NONE, ring, '1 lobby-connection'));
    for (let at = 0; at < SETTLE_LIMIT; at += 1) {
      target.rect = rectOf(770, 313 + ((at % 2) + 1), 420, 259);
      flush();
    }
    expect(frames).toHaveLength(0);
  });
});

describe('scrollToTarget', () => {
  it('brings the top edge of a target taller than the window into view', () => {
    const { doc } = fakeView();
    const players = nodeIn(doc, PLAYERS);
    scrollToTarget(players);
    expect(players.scrollIntoView).toHaveBeenCalledWith({ block: 'start', inline: 'center', behavior: 'instant' });
  });

  it('centres a target that fits', () => {
    const { doc } = fakeView();
    const connection = nodeIn(doc, CONNECTION);
    scrollToTarget(connection);
    expect(connection.scrollIntoView).toHaveBeenCalledWith({ block: 'center', inline: 'center', behavior: 'instant' });
  });
});

describe('the mascot stand', () => {
  const spotFor = (rect) => {
    const hole = holeAround(rect);
    const place = bubblePlace(hole, BUBBLE, VIEW);
    return mascotSpot({ bubble: place.box, hole }, VIEW, MASCOT_BOX, MASCOT_GAP);
  };

  it('gives the same stand for the same inputs, every time', () => {
    const first = spotFor(CONNECTION);
    expect(first).not.toBeNull();
    for (let at = 0; at < 20; at += 1) expect(spotFor(CONNECTION)).toEqual(first);
  });

  it('does not flip when the steps are measured again in turn', () => {
    const connection = spotFor(CONNECTION);
    const players = spotFor(PLAYERS);
    expect([spotFor(PLAYERS), spotFor(CONNECTION), spotFor(PLAYERS)]).toEqual([players, connection, players]);
  });

  it('breaks a tie between equal stands by their fixed order, left first', () => {
    const bubble = { x: 480, y: 200, width: 320, height: 180 };
    const spot = mascotSpot({ bubble, hole: null }, VIEW, MASCOT_BOX, MASCOT_GAP);
    expect(spot?.x).toBe(bubble.x - MASCOT_GAP - MASCOT_BOX.width / 2);
  });

  it('stands on whole pixels, so a sub-pixel change of the hole does not send it walking', () => {
    const near = spotFor(rectOf(770.2, 313.1, 420, 259));
    expect(near).toEqual(spotFor(rectOf(770.3, 313.2, 420, 259)));
    expect(Number.isInteger(near?.x)).toBe(true);
  });
});
