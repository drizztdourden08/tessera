/* @layer stories @kind data */
import type { SiteLink } from '../../../src/composites';
import type { StoreItem, StoreSection } from './site-story.type';

const STORE_SECTIONS: readonly StoreSection[] = [
  { id: 'home', label: 'Home', icon: 'house', group: '' },
  { id: 'browse', label: 'Browse', icon: 'layout-grid', group: 'Hookshop' },
  { id: 'music', label: 'Music packs', icon: 'headphones', group: 'Kinds' },
  { id: 'characters', label: 'Characters', icon: 'user', group: 'Kinds' },
  { id: 'languages', label: 'Languages', icon: 'globe', group: 'Kinds' },
  { id: 'publications', label: 'My publications', icon: 'package', group: 'You' },
  { id: 'account', label: 'Ganon Fan', icon: 'users', group: 'You' },
  { id: 'review', label: 'Reviewer Hub', icon: 'star', group: 'Reviewer' },
  { id: 'admin', label: 'Administration', icon: 'settings', group: 'Reviewer' },
];

const STORE_ITEMS: readonly StoreItem[] = [
  { id: 'dark-world', name: 'Dark World Remix', kind: 'Music pack', icon: 'headphones', tone: 'primary', installs: '340 this month' },
  { id: 'link-red', name: 'Link in Red', kind: 'Character', icon: 'user', tone: 'danger', installs: '212 this month' },
  { id: 'hylian', name: 'Hylian Script', kind: 'Language', icon: 'globe', tone: 'success', installs: '120 this month' },
  { id: 'kakariko', name: 'Kakariko Strings', kind: 'Music pack', icon: 'headphones', tone: 'warning', installs: '96 this month' },
];

const PUBLIC_LINKS: readonly SiteLink[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'browse', label: 'Browse', href: '#browse' },
  { id: 'music', label: 'Music packs', href: '#music' },
  { id: 'characters', label: 'Characters', href: '#characters' },
  { id: 'languages', label: 'Languages', href: '#languages' },
];

const FOOTER_LINKS: readonly SiteLink[] = [
  { id: 'rules', label: 'Publishing rules', href: '#rules' },
  { id: 'privacy', label: 'Privacy', href: '#privacy' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com', external: true },
  { id: 'source', label: 'Source', href: 'https://github.com', external: true },
];

const SITE_TEXT = {
  publications: 'My publications',
  filterPlaceholder: 'Filter my publications',
  filterLabel: 'Filter my publications',
  count: ['publication', 'publications'],
  homeLabel: 'Hookshop home',
  wordmark: 'Hookshop',
  welcome: 'Music packs, characters and languages made by players.',
  footerNote: 'Made by players for Relic of the Past.',
  searchPlaceholder: 'Search the Hookshop',
  publish: 'Publish',
  popular: 'Popular this month',
  install: 'Install in the app',
  author: 'Ganon Fan · v1.2.0',
  signInTitle: 'Sign in',
  signIn: 'Sign in to install packs and publish your own.',
  providers: ['Continue with Discord', 'Continue with GitHub', 'Continue with Google'],
  account: 'Account',
  signOut: 'Sign out',
  results: 'Results for',
  person: 'Ganon Fan',
} as const;

export { FOOTER_LINKS, PUBLIC_LINKS, SITE_TEXT, STORE_ITEMS, STORE_SECTIONS };
