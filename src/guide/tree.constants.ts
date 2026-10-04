/* @layer renderer-design-system @kind data */
import type { DecisionNode } from './tree.type';

const ACTIONS = {
  question: 'One action, or several related buttons?',
  answers: {
    'one action': {
      question: 'What does the action look like?',
      answers: {
        'a visible word': null,
        'an icon only': null,
        'irreversible, on a row': null,
        'irreversible, for a whole view': null,
        'goes to a URL': null,
        'copies a text': null,
        'a whole area the user presses': null,
      },
    },
    'several related buttons': {
      question: 'How do the buttons relate?',
      answers: {
        'only one can be on': null,
        'each on or off by itself': null,
        'peer actions on one thing, read as one tool': null,
        'separate decisions, with space between': null,
        'too many, or secondary': null,
      },
    },
  },
} as const;

const VALUES = {
  question: 'What does the user set?',
  answers: {
    'free text or a number': {
      question: 'What shape is it?',
      answers: {
        'one line of text': null, 'several lines of text': null, 'a number typed in': null,
        'a number stepped up or down': null, 'text that follows a pattern': null, 'free words, as tags': null,
      },
    },
    'one choice': {
      question: 'How many options are there?',
      answers: { 'a few, all in view': null, 'many, in a list': null, 'many, found by typing': null },
    },
    'several choices': null,
    'on or off': {
      question: 'When does the change apply?',
      answers: { 'at once': null, 'when the form is sent': null },
    },
    'a colour': {
      question: 'Where does the picker sit?',
      answers: { 'in the page': null, 'behind a swatch button': null },
    },
    'a range': null,
    'a file': null,
    'a whole record': {
      question: 'What happens to the record?',
      answers: { 'edit it in place': null, 'create one in the page': null, 'create one in a dialog': null },
    },
    'several settings, behind one button': null,
    'the label and help around an input': null,
  },
} as const;

const STATUS = {
  question: 'What does it show?',
  answers: {
    'the state something is in': null, 'a count, or a dot for news': null, 'a value that sorts an item into a group': null,
    'a label and its value': null, 'terms and what they mean': null, 'a colour sample': null, 'a key or a shortcut': null,
    'a list of keys and what they do': null, 'a value to copy, such as an address or a key': null,
  },
} as const;

const OVERLAYS = {
  question: 'What sits over the page?',
  answers: {
    'a hint on hover or focus': null, 'a question the user must answer': null, 'a dialog with its own layout': null,
    'a panel from the edge of the window': null, 'a search over every command': null,
    'a cover over a part that is off': null, 'a dim backdrop': null,
  },
} as const;

const NAVIGATION = {
  question: 'Where does the user go?',
  answers: {
    'between views of one area': null, 'between pages, from the header': null, 'between pages, from a side list': null,
    'between sections of one long page': null, 'through a nested tree': null, 'to a search result': null,
    'through the steps of one task': null, 'between a few modes, from a floating switch': null,
  },
} as const;

const LAYOUT = {
  question: 'What are you arranging?',
  answers: {
    'a plain block': null, 'items in a row or a column': null, 'blocks stacked in a column': null, 'items on a grid': null,
    'one item in the centre': null, 'one raised item': null, 'empty space': null, 'a line between sections': null,
    'content that scrolls': null, 'a list beside its detail': null, 'two panes the user resizes': null,
    'an app frame with its navigation': null, 'panels the user docks and moves': null,
    'a header with an icon and a title over a block': null,
    'a settings screen': {
      question: 'Which part of it?',
      answers: { 'the whole page': null, 'one section of rows': null, 'a list of groups': null },
    },
    'window chrome': {
      question: 'Which part of the window?',
      answers: { 'the title bar': null, 'a header inside the window': null },
    },
    'a ready-made app panel': {
      question: 'Which panel?',
      answers: { 'facts in groups': null, 'an opening banner with art': null },
    },
    'the app root': null,
  },
} as const;

const FEEDBACK = {
  question: 'What are you telling the user?',
  answers: {
    'work is running, length unknown': null, 'progress toward an end, as a bar': null,
    'progress toward an end, in a small round space': null, 'a short message that passes': null,
    'a note that stays on the page': null, 'nothing is here yet': null, 'a hint for what is under the pointer': null,
    'a part of the page failed': null,
  },
} as const;

const SCREENS = {
  question: 'What is the screen for?',
  answers: {
    'working across pages, picked from a side list': null,
    'reading, such as About or credits': null,
    'one short task with a status, such as an update check': null,
    'one big custom surface, such as calibration': null,
  },
} as const;

const TEXT = {
  question: 'What kind of text?',
  answers: {
    'a heading': null, 'a section heading with an action': null, 'running text': null, 'a quotation': null,
    'a block of code': null, 'words that draw the eye, animated': null,
  },
} as const;

const DATA = {
  question: 'What data are you showing?',
  answers: {
    'rows and columns to sort and filter': null, 'filters over a collection': null,
    'one record, compact and read only': null, 'a row in a list, with its actions': null, 'a stream of log lines': null,
    'a drawing': { question: 'How is it drawn?', answers: { 'in pixels': null, 'in shapes': null } },
    'a chart': {
      question: 'What should the chart show?',
      answers: {
        'a trend over recent samples': null, 'one value against its limit': null,
        'a headline number with its trend': null, 'a whole split into parts': null,
      },
    },
    'a picture or a video': {
      question: 'Which one?',
      answers: { 'a picture that holds its box': null, 'a small framed picture': null, 'a video': null },
    },
    'controller or keyboard input': {
      question: 'What about the input?',
      answers: {
        'a keyboard with keys marked': null, 'a tour of shortcuts': null, 'which buttons are held': null,
        'where a stick points': null,
      },
    },
  },
} as const;

const ICONS_AND_BRAND = {
  question: 'Which mark?',
  answers: {
    'an icon from the set': null, 'a small stroke glyph': null, 'an icon from your own path': null, 'an emoji': null,
    'the search mark': null, 'an app logo': null, 'an app mark alone': null, 'an app name': null, 'an app mascot': null,
    'the brand scene': null, 'the interactive mosaic': null,
  },
} as const;

const DECISION_TREE = {
  question: 'What are you placing?',
  answers: {
    'actions': ACTIONS,
    'a value the user sets': VALUES,
    'a status, a count or a label': STATUS,
    'something over the page': OVERLAYS,
    'a full screen view': SCREENS,
    'navigation': NAVIGATION,
    'layout': LAYOUT,
    'feedback': FEEDBACK,
    'text': TEXT,
    'data': DATA,
    'icons and brand': ICONS_AND_BRAND,
  },
} as const satisfies DecisionNode;

export { DECISION_TREE };
