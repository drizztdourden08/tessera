/* @layer renderer-components @kind component */
import type { Ref } from 'react';
import { Link } from '../../Link';
import { anchorAttributes } from '../behavior/anchor-attributes';
import type { ButtonLinkProps } from './ButtonLink.type';

const ButtonLink = (props: ButtonLinkProps) => {
  const { href, target, rel, download, disabled, loading, linkRef, attributes, className, children } = props;
  const inert = loading || Boolean(disabled);
  return (
    <Link
      ref={linkRef as unknown as Ref<HTMLAnchorElement>}
      {...anchorAttributes(attributes, inert)}
      href={inert ? undefined : href}
      target={target}
      rel={rel}
      download={download}
      role={inert ? 'link' : undefined}
      aria-disabled={inert || undefined}
      aria-busy={loading || undefined}
      className={className}
    >
      {children}
    </Link>
  );
};

export { ButtonLink };
