---
"@drizztdourden08/tessera": patch
---

WindowTitleBar keeps a tucked pin and full screen in reach with `view={false}`: the main menu then lists them in the bar's own group, where View would have been. `onFitChange` hears the ids of the bar items a narrow window tucks away, each time that list changes. Pin and full screen in the menu are now actions whose label and icon say what a pick does, with no check mark, since a check mark there showed while the window was neither pinned nor in full screen.
