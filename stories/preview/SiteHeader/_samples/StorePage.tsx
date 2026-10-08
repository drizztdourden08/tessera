/* @layer stories @kind component */
import { ItemCard, SettingsPage } from '../../../../src/composites';
import { Box, Button, Card, Grid, Icon, Paragraph, Stack } from '../../../../src/primitives';
import { SITE_TEXT, STORE_ITEMS } from './site-samples.constants';
import type { StorePageProps } from './site-story.type';

const StorePage = ({ section, selectedId, onSelect }: StorePageProps) => {
  const selected = STORE_ITEMS.find((item) => item.id === selectedId);
  return (
    <Box className="site-story__page">
      <SettingsPage
        icon={<Icon name={section.icon} />}
        title={section.label}
        actions={<Button variant="secondary" size="sm" icon={<Icon name="plus" />}>{SITE_TEXT.publish}</Button>}
      >
        <Stack gap="md" align="stretch">
          <Paragraph tone="dim">{SITE_TEXT.welcome}</Paragraph>
          <Grid minColWidth={200} gap="md" aria-label={SITE_TEXT.popular}>
            {STORE_ITEMS.map((item) => (
              <ItemCard
                key={item.id}
                title={item.name}
                eyebrow={item.kind}
                media={<Icon name={item.icon} size={32} />}
                mediaTone={item.tone}
                details={[SITE_TEXT.author, item.installs]}
                selected={item.id === selectedId}
                onOpen={() => onSelect(item.id)}
              />
            ))}
          </Grid>
        </Stack>
      </SettingsPage>
      {selected && (
        <Box as="aside" className="site-story__aside">
          <Card title={selected.name} subtitle={selected.kind}>
            <Paragraph tone="dim">{SITE_TEXT.author}</Paragraph>
            <Button variant="primary" size="sm">{SITE_TEXT.install}</Button>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export { StorePage };
