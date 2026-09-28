/* @layer renderer-components @kind component */
import { BrandMark } from '../../BrandMark';
import type { LogoProps } from '../Logo.type';

const LogoMark = (props: LogoProps) => {
  const { brand = 'tessera', ...rest } = props;
  return <BrandMark app={brand} {...rest} />;
};

export { LogoMark };
