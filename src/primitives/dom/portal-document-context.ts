/* @layer renderer-components @kind util */
import { createContext } from 'react';

const PortalDocumentContext = createContext<Document | null>(null);

export { PortalDocumentContext };
