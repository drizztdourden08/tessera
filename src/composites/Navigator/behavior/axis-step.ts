/* @layer renderer-components @kind logic */
import type { NavigatorAxisStep, NavigatorStep } from '../Navigator.type';

const axisStep = (step: NavigatorStep): NavigatorAxisStep => (typeof step === 'number' ? { x: step, y: step } : step);

export { axisStep };
