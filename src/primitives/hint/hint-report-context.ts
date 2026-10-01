/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import type { HintSourceReport } from './hint.type';

const HintReportContext = createContext<HintSourceReport | null>(null);

export { HintReportContext };
