/* @layer stories @kind data */
const STARTING = `<main class="ts-stage">
  <h1 class="ts-title">Archipelia</h1>
  <p class="ts-status" aria-live="polite">Loading the engine</p>
</main>
<span class="ts-version">0.4.2</span>
<div class="ts-progress ts-progress--edge" style="--value: 0.62" role="progressbar" aria-label="Loading" aria-valuenow="62"></div>`;

const FAILED = `<main class="ts-stage">
  <h1 class="ts-title">Archipelia</h1>
  <p class="ts-status ts-status--danger" role="alert">The engine did not start: port 38281 is taken.</p>
  <div class="ts-actions">
    <button class="ts-button ts-button--primary" type="button">Retry</button>
    <button class="ts-button" type="button">Open logs</button>
    <button class="ts-button" type="button">Quit</button>
  </div>
</main>
<span class="ts-version">0.4.2</span>
<div class="ts-progress ts-progress--edge ts-progress--danger" style="--value: 0.62" role="progressbar" aria-label="Loading" aria-valuenow="62"></div>`;

const PARTS = `<main class="ts-stage">
  <p class="ts-status">ts-status: Checking for updates</p>
  <p class="ts-status ts-status--danger">ts-status--danger: Download failed</p>
  <div class="ts-progress" style="--value: 0.35" role="progressbar" aria-label="Download" aria-valuenow="35"></div>
  <div class="ts-actions">
    <button class="ts-button ts-button--primary" type="button">ts-button--primary</button>
    <button class="ts-button" type="button">ts-button</button>
    <button class="ts-button" type="button" disabled>disabled</button>
  </div>
</main>
<span class="ts-version">ts-version 1.0.0</span>`;

export { FAILED, PARTS, STARTING };
