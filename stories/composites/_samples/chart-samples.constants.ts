/* @layer stories @kind data */
import type { StackedBarSegment } from '../../../src/composites';

const CPU_SERIES = [22, 25, 31, 28, 35, 41, 38, 52, 61, 58, 66, 72, 69, 81, 86, 78, 74, 83, 88, 79, 71, 64, 59, 62];

const FPS_SERIES = [142, 144, 141, 139, 143, 120, 88, 52, 47, 63, 110, 138, 144, 143, 140, 142, 144, 141, 96, 58, 71, 132, 141, 144];

const NET_SERIES = [4, 9, 6, 14, 22, 18, 31, 26, 12, 8, 19, 35, 42, 28, 16, 11, 24, 38, 33, 21, 14, 9, 17, 26];

const FLAT_SERIES = [50, 50, 50, 50, 50, 50, 50, 50];

const MEMORY_SEGMENTS: readonly StackedBarSegment[] = [
  { id: 'game', label: 'Game', value: 4.2 },
  { id: 'browser', label: 'Browser', value: 1.8 },
  { id: 'system', label: 'System', value: 1.4 },
  { id: 'brock', label: 'Brock', value: 0.9 },
  { id: 'chat', label: 'Voice chat', value: 0.6 },
];

const MANY_SEGMENTS: readonly StackedBarSegment[] = [
  ...MEMORY_SEGMENTS,
  { id: 'recorder', label: 'Recorder', value: 0.7 },
  { id: 'launcher', label: 'Launcher', value: 0.4 },
  { id: 'shaders', label: 'Shader cache', value: 0.3 },
  { id: 'guard', label: 'Antivirus', value: 0.2 },
  { id: 'files', label: 'File browser', value: 0.15 },
  { id: 'audio', label: 'Audio', value: 0.1 },
  { id: 'updater', label: 'Updater', value: 0.08 },
  { id: 'tray', label: 'Tray icons', value: 0.05 },
  { id: 'fonts', label: 'Font cache', value: 0.04 },
];

const TONED_SEGMENTS: readonly StackedBarSegment[] = [
  { id: 'done', label: 'Done', value: 46, color: 'success' },
  { id: 'running', label: 'Running', value: 12, color: 'info' },
  { id: 'waiting', label: 'Waiting', value: 9, color: 'warning' },
  { id: 'failed', label: 'Failed', value: 3, color: 'danger' },
];

export { CPU_SERIES, FLAT_SERIES, FPS_SERIES, MANY_SEGMENTS, MEMORY_SEGMENTS, NET_SERIES, TONED_SEGMENTS };
