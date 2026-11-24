/* @layer stories @kind constants */
import type { ChatTranscriptMessage } from '../../../src/composites';

const CHAT_SAMPLE_MESSAGES: ChatTranscriptMessage[] = [
  { id: 'm1', speaker: 'Owner', role: 'user', time: '09:12', content: 'Is the nightly build green?' },
  { id: 'm2', speaker: 'Overlord', role: 'assistant', time: '09:12', content: 'Checking the boards now.' },
  {
    id: 'm3',
    speaker: 'Overlord',
    content: 'Two boards have failing gates.',
    tools: [
      { id: 't1', name: 'board_summary', summary: 'tessera', status: 'done' },
      { id: 't2', name: 'list_items', summary: 'archipelia, open', detail: 'Found 4 open items. 2 are blocked on a dependency.', status: 'done' },
      { id: 't3', name: 'run_status', summary: 'nightly', status: 'running' },
    ],
  },
  { id: 'm4', speaker: 'System', role: 'system', time: '09:13', content: 'Run nightly started.' },
  { id: 'm5', speaker: 'Owner', role: 'user', time: '09:14', content: 'Tell me when it ends.' },
];

const CHAT_SAMPLE_HISTORY: ChatTranscriptMessage[] = Array.from({ length: 160 }, (_, index) => (
  index % 2 === 0
    ? { id: `h${index}`, speaker: 'Owner', role: 'user', time: '09:' + String(index % 60).padStart(2, '0'), content: `Question number ${index + 1}.` }
    : { id: `h${index}`, speaker: 'Overlord', content: `Answer number ${index + 1}. It is long enough to take more than one line when the frame is narrow.` }
));

const CHAT_SAMPLE_REPLIES = ['Understood.', 'Still running.', 'One gate failed. I am looking at it.', 'The run ended green.'];

export { CHAT_SAMPLE_HISTORY, CHAT_SAMPLE_MESSAGES, CHAT_SAMPLE_REPLIES };
