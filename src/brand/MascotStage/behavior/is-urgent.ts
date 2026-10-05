/* @layer renderer-components @kind logic */
import type { MascotStep } from '../MascotStage.type';
import { CLIP_RULES, URGENT } from './transition-rules.constants';

const isUrgent = (step: MascotStep, priority: number): boolean => priority >= URGENT || ('play' in step && CLIP_RULES[step.play]?.urgent === true);

export { isUrgent };
