/* @layer renderer-components @kind data */
import type { PasswordRule, PasswordScore, PasswordStrengthLevel } from './PasswordInput.type';

const STRENGTH_LEVELS: Readonly<Record<PasswordScore, PasswordStrengthLevel>> = { 0: 'weak', 1: 'weak', 2: 'fair', 3: 'good', 4: 'strong' };

const LEVEL_FILL: Readonly<Record<PasswordStrengthLevel, number>> = { weak: 1, fair: 2, good: 3, strong: 4 };

const STRENGTH_SEGMENTS: readonly number[] = [1, 2, 3, 4];

const MAX_SCORE: PasswordScore = 4;

const NO_RULES: readonly PasswordRule[] = [];

const ANNOUNCE_DELAY_MS = 1000;

const HINT_ICON_SIZE = 14;

export { ANNOUNCE_DELAY_MS, HINT_ICON_SIZE, LEVEL_FILL, MAX_SCORE, NO_RULES, STRENGTH_LEVELS, STRENGTH_SEGMENTS };
