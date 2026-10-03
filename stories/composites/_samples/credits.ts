/* @layer stories @kind data */
interface CreditEntry {
  name: string;
  role: string;
  usage: string;
}

interface CreditSection {
  id: string;
  title: string;
  entries: readonly CreditEntry[];
}

const CREDITS: readonly CreditSection[] = [
  {
    id: 'team',
    title: 'Team',
    entries: [
      { name: 'Mira Okafor', role: 'Design and code', usage: 'Lead' },
      { name: 'Jonas Varga', role: 'Tracker logic', usage: 'Code' },
      { name: 'Ana Lindqvist', role: 'Sprites and icons', usage: 'Art' },
    ],
  },
  {
    id: 'projects',
    title: 'Open-source projects',
    entries: [
      { name: 'Archipelago', role: 'The multiworld server the sessions run on', usage: 'Network' },
      { name: 'Lucide', role: 'The interface icons', usage: 'Icons' },
      { name: 'React', role: 'The interface library', usage: 'Runtime' },
    ],
  },
  {
    id: 'thanks',
    title: 'Thanks',
    entries: [
      { name: 'The testers', role: 'Every bug report and every long session', usage: 'Testing' },
      { name: 'The speedrun community', role: 'Routes, glitches and the data behind the maps', usage: 'Data' },
    ],
  },
];

export { CREDITS };
