/* @layer renderer-components @kind logic */
import { isValidElement } from 'react';
import type { SettingsLoadProblem, SettingsRowProps } from '../SettingsRow.type';

const isLoadProblem = (problem: SettingsRowProps['problem']): problem is SettingsLoadProblem => (
  typeof problem === 'object' && problem !== null && !isValidElement(problem) && 'message' in problem
);

export { isLoadProblem };
