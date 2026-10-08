/* @layer stories @kind component */
import { SettingsPage } from '../../../src/composites';
import { Box, Button, Card, Icon, Paragraph, Stack } from '../../../src/primitives';
import { PART } from './site-parts.constants';
import { SitePartTag } from './SitePartTag';
import { SitePublications } from './SitePublications';
import { SITE_TEXT, STORE_ITEMS } from './site-samples.constants';
import type { StorePageProps } from './site-story.type';
import { SiteStoreItems } from './SiteStoreItems';

const SiteStorePage = ({ section, selectedId, onSelect, labels }: StorePageProps) => {
  const selected = STORE_ITEMS.find((item) => item.id === selectedId);
  return (
    <Box className="site-story__page">
      <SitePartTag name={PART.page} show={labels} place="bottom-end" className="site-story__main">
        <SettingsPage
          icon={<Icon name={section.icon} />}
          title={section.label}
          actions={<Button variant="secondary" size="sm" icon={<Icon name="plus" />}>{SITE_TEXT.publish}</Button>}
        >
          <Stack gap="lg" align="stretch">
            <Paragraph tone="dim">{SITE_TEXT.welcome}</Paragraph>
            <SitePartTag name={PART.items} show={labels}>
              <SiteStoreItems selectedId={selectedId} onSelect={onSelect} />
            </SitePartTag>
            <SitePartTag name={PART.table} show={labels}>
              <Card title={SITE_TEXT.publications}>
                <SitePublications />
              </Card>
            </SitePartTag>
          </Stack>
        </SettingsPage>
      </SitePartTag>
      {selected && (
        <SitePartTag name={PART.card} show={labels} place="bottom-end" className="site-story__aside">
          <Card title={selected.name} subtitle={selected.kind}>
            <Stack gap="sm" align="start">
              <Paragraph tone="dim">{SITE_TEXT.author}</Paragraph>
              <Button variant="primary" size="sm">{SITE_TEXT.install}</Button>
            </Stack>
          </Card>
        </SitePartTag>
      )}
    </Box>
  );
};

export { SiteStorePage };
