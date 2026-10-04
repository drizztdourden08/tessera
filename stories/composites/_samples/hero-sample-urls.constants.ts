/* @layer stories @kind data */
const SAMPLE_URLS = import.meta.glob<string>('./hero-*.{png,svg}', { eager: true, query: '?url', import: 'default' });

const HERO_SAMPLE_URLS = {
  night: SAMPLE_URLS['./hero-night.png'] ?? '',
  dunes: SAMPLE_URLS['./hero-dunes.svg'] ?? '',
  tile: SAMPLE_URLS['./hero-tile.svg'] ?? '',
};

export { HERO_SAMPLE_URLS };
