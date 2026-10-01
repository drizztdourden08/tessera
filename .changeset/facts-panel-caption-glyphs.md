---
'@drizztdourden08/tessera': minor
---

`FactsPanel` is a new composite for label and value pairs in groups split by hairlines, and `Hero` draws its facts with it (`HeroFact` and `HeroFactRow` give way to `FactsPanelFact` and `FactsPanelGroup`). `WindowTitleBar` draws its caption buttons with the new `windowMinimize` and `windowClose` glyphs and the existing maximize and restore glyphs. `AboutPanel` takes `brand` to draw the app's icon and wordmark from the brand family. A pressed danger `IconButton` stays red, `LogPanel` no longer lets times run into tags, the `SectionNav` rail glows on its current item, `SectionNav` takes `overlay` and compact `NavLayout` slides the menu over the page, `TabBar` icons centre on their labels, `SettingsPage` blurs its backdrop, and `StickPlot` draws a line to the dot with a muted `Small` calibrated marker; see MIGRATION.md.
