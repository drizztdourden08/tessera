---
"@drizztdourden08/tessera": minor
---

New `Disclosure` primitive, a line that shows or hides what is under it on the browser details element, and new `LoadError` composite, one plain sentence, a Retry and the raw error behind Details, centred, in a box or inline; `Callout` takes `details`; ItemList, TaskProgress, ErrorBoundary (now in the composites, with `onRetry`) and a `SettingsRow` load problem draw their failures with `LoadError`; TaskProgress and RecordEditor fold with `Disclosure`; UtilityScreen and Splash put a raw `error` behind Details, a UtilityScreen action takes `retry`, and a failed Video offers Retry.
