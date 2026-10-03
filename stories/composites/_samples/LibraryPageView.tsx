/* @layer stories @kind component */
import { SettingsPage, SettingsSection } from '../../../src/composites';
import { Icon, Paragraph, Strong } from '../../../src/primitives';
import { LIBRARY_PAGES } from './library-pages';

const LibraryPageView = (props: { id: string; flash?: string }) => {
  const { id, flash } = props;
  const page = LIBRARY_PAGES.find((candidate) => candidate.id === id) ?? LIBRARY_PAGES[0];
  if (page === undefined) return null;
  return (
    <SettingsPage key={page.id} icon={<Icon name={page.icon} />} title={page.title}>
      <SettingsSection
        id={page.id}
        flash={flash}
        rows={page.entries.map((entry) => ({ id: entry.id, title: entry.title, content: <><Strong>{entry.title}</Strong><Paragraph tone="muted">{entry.text}</Paragraph></> }))}
      />
    </SettingsPage>
  );
};

export { LibraryPageView };
