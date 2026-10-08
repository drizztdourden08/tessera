/* @layer stories @kind component */
import { useState } from 'react';
import { SiteHeader } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { hookshopBrand } from './site-brand';
import { HOOKSHOP_PROFILE } from './site-profile';
import { SiteSignInButton } from './SiteSignInButton';
import { PUBLIC_LINKS } from './site-samples.constants';
import type { SiteHeaderArgs } from './site-story.type';

const SiteHeaderDemo = (args: Partial<SiteHeaderArgs>) => {
  const [active, setActive] = useState('home');
  const phone = args.width === 'phone';
  const brand = hookshopBrand();
  const signedIn = args.signedIn !== false;
  return (
    <Box className={`site-story__header-frame${phone ? ' site-story__header-frame--phone' : ''}`} data-palette="rotp">
      <SiteHeader
        brand={args.title === false ? { ...brand, title: undefined } : brand}
        links={args.links === false ? undefined : PUBLIC_LINKS}
        activeId={active}
        navigate={(href) => setActive(href.slice(1))}
        profile={signedIn ? HOOKSHOP_PROFILE : undefined}
        actions={signedIn ? undefined : <SiteSignInButton />}
      />
    </Box>
  );
};

export { SiteHeaderDemo };
