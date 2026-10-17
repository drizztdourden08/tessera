/* @layer stories @kind logic */
const pixelWordmarkSplashHtml = (src: string, name: string): string => `<main class="ts-stage">
  <h1 class="ts-title"><img class="ts-wordmark ts-wordmark--pixelated" src="${src}" alt="${name}" /></h1>
  <p class="ts-status" aria-live="polite">Starting</p>
</main>`;

export { pixelWordmarkSplashHtml };
