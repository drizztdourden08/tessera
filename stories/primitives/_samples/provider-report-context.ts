/* @layer stories @kind logic */
import { createContext } from 'react';

const ProviderReportContext = createContext<(line: string) => void>(() => undefined);

export { ProviderReportContext };
