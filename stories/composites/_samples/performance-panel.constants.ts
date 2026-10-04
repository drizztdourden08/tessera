/* @layer stories @kind data */
import type { WidgetTab } from '../../../src/composites';
import type { GaugeThresholds, SparklineBand } from '../../../src/primitives';

const HEAT_THRESHOLDS: GaugeThresholds = { warning: 75, danger: 85 };

const LOW_FPS_BAND: SparklineBand = { from: 0, to: 60, tone: 'danger' };

const SLOW_FRAME_BAND: SparklineBand = { from: 16.7, tone: 'warning' };

const FPS_MAX = 165;

const PERFORMANCE_TABS: WidgetTab[] = [{ id: 'performance', label: 'Performance' }];

export { FPS_MAX, HEAT_THRESHOLDS, LOW_FPS_BAND, PERFORMANCE_TABS, SLOW_FRAME_BAND };
