/* @layer stories @kind data */
const FILES = import.meta.glob<string>('./wordmark-sprite*.png', { eager: true, query: '?url', import: 'default' });

const WORDMARK_SPRITES = {
  'Sprite, 52 by 8 px': FILES['./wordmark-sprite.png'] ?? '',
  'Very wide sprite, 118 by 8 px': FILES['./wordmark-sprite-wide.png'] ?? '',
} as const;

export { WORDMARK_SPRITES };
