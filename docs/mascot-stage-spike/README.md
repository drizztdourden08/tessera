# Mascot stage: design spike

A strip of fixed height and any width where Sentri, Flint and Pelago live. Each one stands at an x, faces left or right, walks, and moves from clip to clip with a short cross-fade, even in the middle of a clip. The extras (question marks, z letters, the laptop) fade in and out with the clips, or on request. A rule-based mode lets each mascot live on its own.

Try it on the spike's gallery: `pnpm exec storylite dev --port 4410` on the branch `spike/mascot-stage`, then open Core · Brand / Mascot stage. The Stage page has the controls (click the stage to send the chosen mascot walking there, drag its corner to resize it, Slow motion to watch the blends); Side by side shows today's AnimatedMascot next to the stage; Crowd measures 3 to 30 mascots at once.

## Second round: more to play with

The gallery page now has twelve stories:

- Stage: pick which mascots are on stage and how many of each (one to three), hide or show each one with its own toggle, and set walk, autonomous mode, extras, speed and stage height in a Stage options menu.
- Director: script a sequence (walk to x, play a clip some times, face, wait), run it, replay it when it ends; three ready scripts (Patrol, Show off, Work day).
- Dialogue: two mascots face each other and take turns, each waiting for the other to finish.
- Follow the pointer: the mascot walks to where you hover, keeping its speed when the target moves; a click makes it hop there.
- Guided tour: the mascot walks below a highlighted card and points up at it.
- Autonomy tuning: live sliders for each rule's weight and cooldown, the pause between behaviours and the nap time, per mascot, with a count of what it picked.
- Flip every clip: each clip facing right and facing left, by mascot and clip group.
- Speed: the stage faster, slower or paused, and one clip at its own speed on top.
- Reduced motion: the stage with the reduced motion setting previewed (or forced off).
- Stress: a random command every few hundred milliseconds (slider), with the engine's frame cost.
- Side by side and Crowd, as before.

Hiding a mascot is a state, not an unmount: `hidden` in the cast or `setVisible(false)` on the handle fades it out over 280 ms; it keeps its place, steps and facing; once fully hidden its clips pause and the engine skips it. Measured with 9 mascots spinning: 0.042 ms of engine work and 0.34 ms of style a frame shown, 0.004 ms and 0 ms hidden. `stageX(clientX)` on the stage handle turns a pointer position into a stage x, and `motion` on the stage (`system`, `full`, `reduced`) previews reduced motion. The autonomous mode takes `napAfter`.

Settled clips still play through today's `playClip`, so the approved clips look the same. Frame cost after this round (Crowd page): engine 0.09, 0.20, 0.28 and 0.33 ms a frame for 3, 9, 18 and 30 mascots; style 0.19 to 1.17 ms against today's 0.10 to 1.02 ms.

## 1. Library choice

Recommendation: **no library.** A small engine of our own on top of the browser's Web Animations API. When a clip is settled it plays through today's `playClip`, unchanged; only while a blend or a walk is running does the engine work per frame.

### What was compared

| | Own engine on WAAPI (built here) | Plain WAAPI, as today | Motion 14 (`animate`) | GSAP 3.15 |
|---|---|---|---|---|
| Size, minified and gzipped | 6.6 kB for the whole stage runtime (the clip sampler alone is 1.5 kB) | 0 | 20.3 kB (`motion/mini` is 3.4 kB but only drives WAAPI, no blending) | 27.6 kB core, 30.7 kB with CustomEase for our cubic-bezier curves |
| Blend mid-clip without a jump | Yes: both clips are sampled and mixed channel by channel; a blend can itself be interrupted | No: WAAPI cannot weight two animations; reading the current pose means `getComputedStyle` matrices | Per value only: a new animation starts from the current value (with velocity for springs). No mix of two running keyframe clips | Same as Motion: `overwrite` and tweening from current values; no mix of two timelines |
| Layers (ambient under action, extras) | Yes, same composite add as today | Yes | No additive layering: the last writer wins per value | No additive layering per property |
| Flip and move to x | Library independent (a wrapper transform and upright groups) | Same | Same; springs suit walking | Same |
| React 19, SSR | Server draws the still first frame with BrandScene; nothing touches `window` until an effect runs | Same | Safe to import | Safe to import |
| Reduced motion | Still pictures, cross-faded | Still pictures | Manual in vanilla use | `gsap.matchMedia` |
| Licence | Ours | Ours | MIT | GSAP Standard "no charge" licence: free, but not an open source licence, and it excludes products that compete with Webflow |
| Fidelity, all 29 clips × 3 mascots | **84 of 87 clips: 0 pixels differ.** The other 3 differ no more than today's playback differs from a second copy of itself | Reference | Sentri 4 of 29 clips within 1/255, worst 221/255; Flint 3 of 29, worst 60/255; Pelago 0 of 29 | Sentri 0 of 29, worst 221/255; Flint 0 of 29, worst 227/255; Pelago 0 of 29 |

### How fidelity was measured

A test page draws the same mascot several times and seeks every copy to the same millisecond: today's AnimatedMascot code (`playClip` on WAAPI) as the reference, then each candidate. 24 moments per clip (two loops for looping clips), all 29 clips, all 3 mascots, Sentri at 6×, Flint 5×, Pelago 4×, every pixel compared.

- Stage, settled clip (what ships): 84 of 87 clips identical. Flint working, Pelago blink and Pelago link differ by at most 1/255, 26/255 and 6/255; a second copy of today's own playback differs from the first by 158/255, 26/255 and 4/255 on those three, so that is the browser's own noise.
- Our sampler alone (the blend path), values written through held animations: Sentri 29 of 29 within 1/255, Flint 27 of 29 (worst 6/255), Pelago 14 of 29 (worst 58/255 on faint glow edges, computed matrices equal to 0.00001).
- Motion and GSAP used as interpolators through the same writer: off by up to 221 to 227/255. Their easing is a hair different from the browser's, and on pixel art a hair is enough to flip a whole row of pixels.
- A finding that matters whatever the engine: Chromium draws an SVG part under an animation differently from the same values set as a plain style (softer sub-pixel edges). Every frame through plain style writes differed (worst 255/255). So the engine writes through paused animations (`KeyframeEffect.setKeyframes`), never through `style`.
- A second finding: hidden extras left in the drawing change how the moving rig is rasterised. The stage takes extras that no running clip uses out of the drawing (`display="none"`); with that, the drawing matches today's.

Before and after strips (top row today, bottom row the stage, at the same moments): `fidelity-sentri.png`, `fidelity-flint.png` in this folder.

### Frame cost

Chromium, headless, Crowd page, CDP metrics over 6 seconds, per frame. Every stage mascot runs the autonomous mode with short pauses, so it blends and walks far more often than real use.

| Mascots | Stage: engine JS | Stage: script, style, layout | Today: script, style, layout |
|---|---|---|---|
| 3 | 0.11 ms | 0.20, 0.28, 0.12 ms | 0.01, 0.18, 0.14 ms |
| 9 | 0.32 ms | 0.33, 0.60, 0.21 ms | 0.01, 0.48, 0.24 ms |
| 18 | 0.56 ms | 0.56, 1.19, 0.44 ms | 0.01, 1.07, 0.37 ms |
| 30 | 0.51 ms | 0.84, 1.86, 0.61 ms | 0.01, 1.19, 0.39 ms |

60 frames a second in every case. A first version that sampled every clip in JS all the time cost 2.9 ms a frame at 30 mascots, mostly in `setKeyframes`; handing settled clips back to the browser cut that by more than five times.

## 2. Design

### The stage

`MascotStage` is a box of fixed height (`height`, default 160 px) and the width of its container, followed with a ResizeObserver. Each mascot's frame (its art plus the effect margins it already has) is scaled to the stage height (`size` for a share of it); pixel art takes the largest whole scale that fits so pixels stay square. The ground is the bottom edge. A mascot's x is its foot centre in stage pixels, kept so its whole frame stays on the stage.

Facing: the drawings face right. Facing left mirrors the whole mascot around its foot centre, and a turn squashes it through its side view in 240 ms. Extras that must stay readable (letters, the laptop, the battery, the bulb) are listed per mascot in `UPRIGHT_EXTRAS`; each gets an inner group that turns back around its own centre, so its place mirrors but the drawing does not. Groups that belong together (battery and cell) turn around the first member.

### The controller

```ts
interface MascotActorHandle {
  play(clip: MascotClip, options?: { at?: number; face?: Facing; loop?: boolean | number; blend?: number; speed?: number; priority?: number }): Promise<'done' | 'interrupted'>;
  moveTo(x: number, options?: { clip?: 'move' | 'move-wobble'; speed?: number; face?: Facing; priority?: number }): Promise<'done' | 'interrupted'>;
  face(facing: 'left' | 'right'): Promise<'done' | 'interrupted'>;
  queue(steps: readonly MascotStep[]): Promise<'done' | 'interrupted'>;
  stop(): void;
  effect(id: string, mode: 'auto' | 'show' | 'hide'): void;
  effects(mode: 'auto' | 'hide'): void;
  autonomy(config: boolean | AutonomyConfig): void;
  state(): { x: number; facing: Facing; clip: MascotClip; moving: boolean; busy: boolean; queued: number };
}
type MascotStep = ({ play: MascotClip } & PlayOptions) | ({ moveTo: number } & MoveOptions) | { face: Facing } | { wait: number };
```

- `play` acts now: the current step ends as interrupted, the queue is cleared, and the new clip cross-fades in from wherever the mascot is. `at` walks there first; `face` turns first. `loop: true` holds the clip until the next command, a number plays it that many times.
- `queue` adds steps after the current ones. When everything is done the mascot settles into its rest clip (`idle` unless the cast says otherwise).
- `moveTo` plays the walk cycle in place while the stage moves the mascot: it speeds up over a quarter second, cruises, and brakes to stop on the spot. A new target mid-walk keeps the speed it has. An interruption without a target glides to a stop instead of halting.

### Transition rules (`CLIP_RULES`)

- Blend: 220 ms by default; walk cycles 160 ms; jumps 120 ms; alerts 110 ms; idle 320 ms; sleep 600 ms, resting and low power 500 ms. `blend` on a command overrides it.
- Extras fade over at least 320 ms, slower than the body, so a symbol never pops (the "!" ramp measured 0 to 1 over 300 ms).
- Mid-turn parts take the short way round, so a part caught mid-spin finishes its turn instead of unwinding.
- Protected moments: the middle of a jump (18 to 72 percent) and of a spin's turns (12 to 50 percent). An ordinary request waits for the moment to pass, then cuts in. Alerts and worried are urgent and cut through anything; so does priority 2.
- Priorities: 0 autonomous, 1 the host (default), 2 urgent. The autonomous mode never interrupts the host.

### Autonomous mode

When a mascot has been idle for a random pause (1.8 to 5.2 s), it picks a behaviour by weight among the rules whose cooldown has passed and whose condition holds, never the same one twice in a row, and queues its steps at priority 0. Rules are data:

```ts
interface AutonomyRule { id: string; weight: number; cooldown: number; when?: (c: AutonomyContext) => boolean; steps: (c: AutonomyContext) => readonly MascotStep[] }
interface AutonomyContext { now: number; x: number; home: number; min: number; max: number; facing: Facing; idleFor: number; random: () => number }
```

The default set: glance (blink, curious or scan), bounce, wander (walk to a spot at least a quarter of the stage away, scan, maybe walk home), wave, think (idea, focused or working), celebrate (spin or jump-hop), and nap (after 45 s without a host command: walk home, rest, sleep). A seed makes a run repeat.

### Events for the host

React: `<MascotStage cast={[{ id, brand, x?, face?, clip?, rest?, size?, autonomy? }]} height playing speed onEvent ref />`. Changing a cast entry's clip, x or face transitions to it (a new x and clip together walks then plays). `ref` gives `actor(id)` (the handle above), `width()` and `stats()`. `onEvent` receives `{ actor, type, clip?, x?, result?, behaviour? }` for step-start, step-end, clip-start, arrive, idle and behaviour.

### How it runs

- Clips stay data. A sampler (`src/brand/motion/sample/`) reproduces the browser's keyframe maths (offsets, per-segment cubic-bezier easing, delays, loops, duplicate offsets, stacked tracks), so any clip can be read at any time.
- Settled: the clip plays through today's `playClip`, lined up with the stage clock. Nothing runs per frame.
- Blending: the engine samples the outgoing and incoming clips, mixes them, and holds the result in paused animations that add onto the ambient clip, exactly as the clips add today. When the blend ends the incoming clip goes back to the browser at the same moment.
- Pause and speed: one stage clock; native animations are resynchronised when it changes.
- Reduced motion: still pictures (each clip's still extras), cross-faded; walking jumps to the target; turns are instant.
- Server rendering: the stage draws each mascot with BrandScene at its first frame. `sceneMarkup` is untouched.

## 3. Migrating the 29 × 3 clips

No clip is redrawn or converted: the stage reads today's data as it is. What a real version needs:

1. Owner review of the rules: blend times, protected moments, which extras stay upright, and whether Sentri's pixel faces should cross-fade (a few frames of see-through pixels, visible in `interrupt-spin-to-alert.png`) or swap at once.
2. Bring the spike code to the repo rules. Lint reports 172 findings, mostly explanatory comments (the repo allows none) and file-shape rules (one export per file, constants and types in their own files, no raw div).
3. Tests: sampler against WAAPI values in a browser test, the step runner and autonomy as plain unit tests, plus the pixel check above as an optional script.
4. Rename the internal `mascotStage` function in AnimatedMascot (it builds a single frame) to avoid two meanings of "stage".
5. Optionally rebuild AnimatedMascot as a one-mascot stage so there is one engine. Not required: the stage already plays clips through AnimatedMascot's own code.

Estimate: two to three days after the owner's review.

## 4. Risks

- The engine leans on a Chromium behaviour (animated SVG parts render softer than styled ones). Writing through paused animations keeps it identical today; another engine (Firefox, Safari) may differ slightly, as today's playback does.
- During a blend the main thread does the work. A busy main thread makes blends stutter; today's SVG animations also run on the main thread in Chromium, so this is no worse.
- The rules (blend times, protected moments, priorities, autonomy weights) are first guesses.
- Mirroring is literal: a clip that waves the right pod waves the left one when facing left.
- A stage narrower than its cast pushes mascots against the edge, where they can overlap. A later version could walk them apart.
- Pelago's faint glow edges differ by up to 58/255 on a few pixels during blends only, never in a settled clip.

## Files

- `src/brand/motion/sample/`: the clip sampler.
- `src/brand/MascotStage/`: the stage, its engine (`behavior/`) and the actor component.
- `stories/brand/MascotStage.stories.tsx` and `stories/brand/_samples/Stage*.tsx`: the gallery pages.
- This folder: the measurement scripts used for the numbers above (`harness/`, written against local paths) and the frame strips.
