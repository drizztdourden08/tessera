/* @layer renderer-components @kind component */
import { Link } from '../../../primitives/Link';
import { useMarkdownSettings } from '../behavior/useMarkdownSettings';
import type { MarkdownLinkProps } from '../Markdown.type';

const MarkdownLink = ({ href, children }: MarkdownLinkProps) => {
  const { onLink } = useMarkdownSettings();
  if (!href) return <>{children}</>;
  if (!onLink) return <Link href={href} external>{children}</Link>;
  return (
    <Link
      href={href}
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
