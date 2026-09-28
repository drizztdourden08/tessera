/* @layer renderer-components @kind component */
import { BrandWordmark } from '../../BrandWordmark';
import type { LogoWordmarkProps } from '../Logo.type';

const LogoWordmark = (props: LogoWordmarkProps) => {
  const { brand = 'tessera', ...rest } = props;
  return <BrandWordmark app={brand} {...rest} />;
};

export { LogoWordmark };
