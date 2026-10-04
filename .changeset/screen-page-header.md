---
'@drizztdourden08/tessera': minor
---

Every screen kind shows the page header, and nothing turns it off. ScreenPage is the new building block for it: a card with a header of icon, title and fading backdrop that compacts once the body scrolls. SettingsPage is built on it. WorkspaceScreen drops `pageHeader` and every `WorkspacePage` needs an `icon`. InfoScreen and StageScreen take a required `icon` and `heading`; StageScreen's toolbar and Done button move into the header. UtilityScreen takes RotP's update dialog look again: the status is the header, the message is a centred line, `notes` is a framed box with a tinted title, progress shows its percent, and `footnote` is replaced by `report`, one red bug icon button. A screen built without the header is a custom screen made from ScreenWindow; in development a screen kind warns when `pageHeader` is forced on it or its header has no icon or title.
