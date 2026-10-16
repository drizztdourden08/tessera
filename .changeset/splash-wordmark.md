---
"@drizztdourden08/tessera": patch
---

A splash can show the app wordmark in place of its name. `splash.css` has a new class, `ts-wordmark`, for an image inside `ts-title`: 48 px high, at most 384 px wide and narrower in a narrow window, centred, with `object-fit: contain`. `Splash` takes `wordmark`, an image URL, and then draws `<img class="ts-wordmark" alt={title}>` in its h1 in place of the title text, so the heading keeps the app name and the React splash draws the same as the static page.
