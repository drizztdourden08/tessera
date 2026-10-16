---
"@drizztdourden08/tessera": minor
---

The hamburger of the WindowTitleBar main menu button turns into an X and back with a visible motion: the middle bar fades out, the top and bottom bars slide to the middle and tilt to 45 degrees, in 200 ms, and at once under reduced motion. The new `--ease-out` token sets the curve. Every other hamburger, on a DropdownMenu `iconOnly` trigger, the SiteHeader phone menu or a ControlMenu, keeps its three bars while its menu is open; change `trigger.icon` from `onOpenChange` to show something else.
