/* @layer stories @kind data */
const RELEASE_NOTES: readonly { title: string; items: readonly string[] }[] = [
  { title: 'New', items: ['A tracker for the item log, with filters by player.', 'Sessions resume after a crash.'] },
  { title: 'Fixed', items: ['The hint window kept an old hint after a reset.', 'Calibration lost the dead zones on the second stick.'] },
];

export { RELEASE_NOTES };
