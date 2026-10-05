# Video

A video player with its own control bar: seek with a time preview, volume, speed, picture in picture, theater mode and full screen.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Video } from '@drizztdourden08/tessera';
```

The source is `src/composites/Video/Video.tsx`. Its gallery page is Composites · Content/Video (`#/story/composites-video--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A picture or a video. Which one? A video.

Video draws its bar over the video in white on black in every theme, and keeps its speed menu and volume inside the frame so they work in full screen.

## Use it when

- A replay, a clip or a live stream plays inside the app.
- The user seeks, changes the volume or the speed, or watches in full screen.

## Use something else when

- A still picture holds its box, such as a poster or a screenshot. Use `Image` instead.
- A small framed preview stands for the video in a list. Use `Thumbnail` instead.

## Rules

- Give it a label that names the video, such as Boss fight replay; the player is a group named by it.
- Size the player through its class with an aspect ratio, since the bar sits over the bottom of the video.
- Let the page own theater mode through theater and onTheaterChange when the layout around the player changes with it.
- Set controls to false for a background or a preview with no bar.

## Accessibility

- The player takes focus: Space or K plays and pauses, the arrows skip five seconds, M mutes, F goes full screen and T sets theater mode.
- The seek bar reads the time as 1:05 of 3:20, and Page Up, Page Down, Home and End jump along it.
- The speed menu holds radio items: the arrows move, Enter picks, Escape closes it and focus goes back to its button.
- The bar fades while the video plays and the pointer rests, and comes back on a key, a move or focus.

## Example

```tsx
import { Video } from '@drizztdourden08/tessera';

const Replay = ({ url, poster }: { url: string; poster: string }) => (
  <Video src={url} poster={poster} label="Boss fight replay" className="replay-player" playsInline />
);
```

## Props

- `controls` (optional): `boolean`. Default `true`.
- `label` (optional): `string`.
- `errorMessage` (optional): `ReactNode`.
- `theater` (optional): `boolean`.
- `defaultTheater` (optional): `boolean`. Default `false`.
- `onTheaterChange` (optional): `(theater: boolean) => void`.

It also takes the 296 attributes it inherits through `Omit<ComponentPropsWithRef<'video'>, 'controls'>`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-danger-bright`, `--c-on-primary`, `--c-primary`, `--c-primary-bright`, `--control-h-sm`, `--duration-slow`, `--ease-standard`, `--font-mono`, `--p-pure-black`, `--p-pure-white`, `--radius-md`, `--radius-round`, `--radius-sm`, `--shadow-2`, `--shadow-3`, `--size-16`, `--size-320`, `--size-6`, `--size-64`, `--size-80`, `--space-2xl`, `--space-2xs`, `--space-lg`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--transition-fast`, `--transition-normal`, `--video-hover`, `--weight-semi`, `--z-popover`, `--z-top`.
