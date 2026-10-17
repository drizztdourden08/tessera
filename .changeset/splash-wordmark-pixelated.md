---
"@drizztdourden08/tessera": minor
---

A sharp pixel art wordmark on the splash, and a wide wordmark with no empty band. Splash takes `wordmarkPixelated?: boolean | 'auto'` (`ImagePixelated`, the same option as Image, `false` by default): with `true`, or with `'auto'` once a picture of 256 px or less on its longest side has loaded, the wordmark takes `ts-wordmark--pixelated`, a new class of `splash.css` that scales it up to the 384 px row with `image-rendering: pixelated`, its height following its proportions up to 48 px. `ts-wordmark` now keeps the height of the picture up to 48 px (`block-size: auto; max-block-size: var(--size-48)`) in place of a fixed 48 px box, so a wordmark that reaches the 384 px cap draws its box only as high as the picture, with no empty band above and below.
