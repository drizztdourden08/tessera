/* @layer renderer-components @kind component */
import { LogoCombined } from './sub-components/LogoCombined';
import { LogoMark } from './sub-components/LogoMark';
import { LogoWordmark } from './sub-components/LogoWordmark';

const Logo = Object.assign(LogoMark, { Wordmark: LogoWordmark, Combined: LogoCombined });

export { Logo };
