---
"@drizztdourden08/tessera": minor
---

Every mascot plays the same ten clips: idle, move, jump, wave, scan, happy, alert, point, blink and link. Sentri gains point, blink and link (a spark that hops pixel by pixel up one edge of the pyramid and down the other, from pod to pod), and Flint gains link (a spark thrown over its head from hand to hand through its glowing chip). One type, `MascotClip`, and one list, `MASCOT_CLIPS`, replace `SentriAnimation`, `FlintAnimation` and `PelagoAnimation`. A mascot's motion can add `effects`: pieces the moving mascot draws hidden until a clip fades them in.
