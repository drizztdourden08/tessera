/* @layer renderer-components @kind component */
import { Link } from '../../../primitives/Link';
import { useMarkdownSettings } from '../behavior/useMarkdownSettings';
import type { MarkdownLinkProps } from '../Markdown.type';

const MarkdownLink = ({ href, children, 'data-id-link': idLink }: MarkdownLinkProps) => {
  const settings = useMarkdownSettings();
  const { onLink } = settings;
  const linkTone = idLink === undefined ? settings.linkTone : settings.idLinkTone ?? settings.linkTone;
  if (!href) return <>{children}</>;
  if (!onLink) return <Link href={href} tone={linkTone} external>{children}</Link>;
  return (
    <Link
      href={href}
      tone={linkTone}
      onClick={(event) => {
        event.preventDefault();
        onLink(href);
      }}
    >
      {children}
    </Link>
  );
};

export { MarkdownLink };
