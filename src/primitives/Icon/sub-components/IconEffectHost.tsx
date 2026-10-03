/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Icon as Iconify } from '@iconify/react/offline';
import { iconLookProps } from '../behavior/icon-look-props';
import { resolveIconEffect } from '../behavior/resolve-icon-effect';
import { IconEffectLayer } from './IconEffectLayer';
import type { IconEffectHostProps } from './IconEffectHost.type';
import './IconEffectHost.css';

const IconEffectHost = (props: IconEffectHostProps) => {
  const { icon, effect, look } = props;
  const hostRef = useRef<HTMLSpanElement>(null);
  const resolved = resolveIconEffect(effect);
  const sampleKey = `${look.size ?? ''}|${look.rotate ?? 0}|${look.flip ?? ''}`;
  const classes = ['icon-effect', `icon-effect--${resolved.color}`, look.inline ? 'icon-effect--inline' : ''].filter(Boolean).join(' ');
  return (
    <span ref={hostRef} className={classes} data-effect={resolved.kind}>
      <Iconify icon={icon} {...iconLookProps(look)} />
      <IconEffectLayer hostRef={hostRef} icon={icon} sampleKey={sampleKey} effect={resolved} />
    </span>
  );
};

export { IconEffectHost };
