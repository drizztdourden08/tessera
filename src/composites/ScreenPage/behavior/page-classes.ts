/* @layer renderer-components @kind logic */
import type { PageClassInput } from './page-classes.type';

const join = (names: readonly (string | false | undefined)[]): string => names.filter(Boolean).join(' ');

const pageClasses = (input: PageClassInput) => ({
  root: join(['screen-page', 'page-card', input.className]),
  body: join(['screen-page__body', !input.scroll && 'screen-page__body--fixed', input.bodyClassName]),
});

export { pageClasses };
