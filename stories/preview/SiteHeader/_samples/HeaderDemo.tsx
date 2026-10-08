/* @layer stories @kind component */
import { useState } from 'react';
import { Box } from '../../../../src/primitives';
import { SiteHeader } from '../SiteHeader';
import { AccountMenu } from './AccountMenu';
import { hookshopBrand } from './hookshop-brand';
import { PUBLIC_LINKS } from './site-samples.constants';
import type { SiteHeaderArgs } from './site-story.type';

const HeaderDemo = (args: Partial<SiteHeaderArgs>) => {
  const [active, setActive] = useState('home');
  const phone = args.width === 'phone';
  const brand = hookshopBrand();
  return (
    <Box className={`site-story__header-frame${phone ? ' site-story__header-frame--phone' : ''}`} data-palette="rotp">
      <SiteHeader
        brand={args.name === false ? { ...brand, name: undefined } : brand}
        links={args.links === false ? undefined : PUBLIC_LINKS}
        activeId={active}
        navigate={(href) => setActive(href.slice(1))}
        actions={args.actions === false ? undefined : <AccountMenu compact={phone} />}
      />
    </Box>
  );
};

export { HeaderDemo };
