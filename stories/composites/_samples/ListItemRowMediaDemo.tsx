/* @layer stories @kind component */
import { ListItemRow } from '../../../src/composites';
import { Box, Icon, IconButton, Image } from '../../../src/primitives';
import { HERO_SAMPLE_URLS } from './hero-sample-urls.constants';

const pen = (
  <IconButton size="sm" variant="ghost" label="Rename Hookshot in hand" title="Rename Hookshot in hand">
    <Icon name="pencil" />
  </IconButton>
);

const ListItemRowMediaDemo = () => (
  <Box className="story-column list-item-row-story">
    <ListItemRow
      media={<Image src={HERO_SAMPLE_URLS.night} alt="" fit="cover" pixelated />}
      name="Before the palace"
      meta="Width from the row height, 16 by 9"
      onClick={() => undefined}
    />
    <ListItemRow
      media={<Image src={HERO_SAMPLE_URLS.dunes} alt="" fit="cover" pixelated />}
      mediaWidth={48}
      name="Hookshot in hand"
      meta="A set width of 48 px, and a pen on hover"
      nameAction={pen}
      selected
      onClick={() => undefined}
    />
  </Box>
);

export { ListItemRowMediaDemo };
