/* @layer tooling-scripts @kind test */
import { createElement as h, createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { JobDialogActions } from '../src/composites/JobDialog/sub-components/JobDialogActions';
import { TaskProgress } from '../src/composites/TaskProgress';
import { ProgressBar } from '../src/primitives/ProgressBar';
import { Stepper } from '../src/primitives/Stepper';

const STEPS = [{ id: 'a', label: 'Prepare' }, { id: 'b', label: 'Generate' }, { id: 'c', label: 'Host' }];
const LOG = [{ id: '1', gutter: '14:02', tag: 'gen', kind: 'info', message: 'Filling 1,204 locations' }];

const statuses = (html) => [...html.matchAll(/class="stepper__item" data-status="(\w+)"/g)].map((match) => match[1]);

describe('TaskProgress', () => {
  it('draws the bar, the line, the steps and a folded log while it runs', () => {
    const html = renderToString(h(TaskProgress, { state: 'running', percent: 52, line: 'Placing items', steps: STEPS, currentId: 'b', log: LOG }));
    expect(html).toContain('data-state="running"');
    expect(html).toContain('aria-valuenow="52"');
    expect(html).toContain('>52%<');
    expect(html).toContain('Placing items');
    expect(statuses(html)).toEqual(['done', 'current', 'upcoming']);
    expect(html).toMatch(/<details class="disclosure disclosure--md task-progress__log">/);
    expect(html).toContain('Show log (1)');
    expect(html).not.toContain('class="log-panel');
    expect(html).not.toContain('role="alert"');
  });

  it('sweeps the bar when the percent is unknown', () => {
    const html = renderToString(h(TaskProgress, { state: 'running' }));
    expect(html).toContain('data-indeterminate="yes"');
    expect(html).not.toContain('aria-valuenow');
  });

  it('marks the current step, shows the error and opens the log when it fails', () => {
    const html = renderToString(h(TaskProgress, { state: 'failed', percent: 52, steps: STEPS, currentId: 'b', error: 'No reachable location', log: LOG }));
    expect(statuses(html)).toEqual(['done', 'error', 'upcoming']);
    expect(html).toMatch(/callout--danger load-error load-error--box.*load-error__message" role="alert">No reachable location/);
    expect(html).toMatch(/<details open="" class="disclosure disclosure--md task-progress__log">/);
    expect(html).toContain('Hide log');
    expect(html).toContain('data-tone="danger"');
    expect(html).toContain('class="log-panel log-panel--fixed" style="block-size:224px"');
    expect(renderToString(h(TaskProgress, { state: 'failed', log: LOG, logOpen: false }))).not.toContain('class="log-panel');
  });

  it('ticks every step and fills the bar once done', () => {
    const html = renderToString(h(TaskProgress, { state: 'done', steps: STEPS, currentId: 'c' }));
    expect(statuses(html)).toEqual(['done', 'done', 'done']);
    expect(html).toContain('aria-valuenow="100"');
    expect(html).toContain('data-tone="success"');
    expect(html).toContain('role="status"');
  });
});

describe('JobDialog buttons', () => {
  const draw = (props) => renderToString(h(JobDialogActions, { onHide: () => {}, onClose: () => {}, cancelling: false, mainRef: createRef(), ...props }));
  const words = (html) => [...html.matchAll(/<button[^>]*>(?:<[^>]+>)*([A-Za-z ]+)</g)].map((match) => match[1].trim());

  it('offers Cancel and Hide while the job runs, Cancel only with onCancel', () => {
    expect(words(draw({ running: true, onCancel: () => {} }))).toEqual(['Cancel', 'Hide']);
    expect(words(draw({ running: true }))).toEqual(['Hide']);
  });

  it('offers Close once the job ends, after any extra action', () => {
    expect(words(draw({ running: false, extra: h('button', null, 'Try again') }))).toEqual(['Try again', 'Close']);
  });
});

describe('Stepper complete and ProgressBar indeterminate', () => {
  it('marks every step done when complete', () => {
    expect(statuses(renderToString(h(Stepper, { steps: STEPS, currentId: 'a', complete: true })))).toEqual(['done', 'done', 'done']);
  });

  it('leaves out the value of an indeterminate bar', () => {
    const html = renderToString(h(ProgressBar, { value: 0, indeterminate: true, showValue: true, label: 'Starting' }));
    expect(html).toContain('data-indeterminate="yes"');
    expect(html).not.toContain('aria-valuenow');
    expect(html).not.toContain('progress-bar__value');
  });
});
