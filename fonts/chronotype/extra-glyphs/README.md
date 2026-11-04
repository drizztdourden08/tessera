<!-- @layer renderer-design-system @kind doc -->
# Added glyphs for the ChronoType face

The original face has no glyph for these characters:

`¼` `½` `¾`

Each SVG here is the source outline for one of them, and `chronotype-ext.woff2` and `chronotype-ext.ttf` in the parent folder carry them. Each glyph is a small numerator, the face's own fraction slash and a small denominator, drawn with one pixel strokes like its superior and inferior figures.

`preview.svg` shows every glyph on its pixel grid.

## Coordinate system

- The viewBox is in pixels: `0 0 10 12`.
- Row 0 of a glyph is the bottom row, the one that sits on the baseline. This is SVG y 8 to 9.
- Capitals and digits are 8 rows tall (rows 0 to 7). The numerator uses rows 3 to 7, the denominator rows 0 to 4, the slash rows 0 to 7.
- The body starts on column 0, like the face's own letters.
- `data-advance` is the pen advance in pixels and equals the viewBox width. `data-char` is the code point.
- The path is axis-aligned: `M`, `H`, `V` and `Z` only, with outer contours clockwise.

## Mapping to font units

The font has 1024 units per em and one pixel is 64 units. The baseline row starts at font y 192.

```
fontX = x * 64
fontY = (12 - y) * 64
advance = data-advance * 64
```

## Face metrics, in pixels

| Metric | Pixels | Units |
|--------|--------|-------|
| Cap height (above baseline row) | 8 | 512 |
| Top of capitals | 11 | 704 |
| Ascender (hhea) | 12 | 768 |
| Descender (hhea) | 1 | -64 |
| Stroke | 1 to 2 | 64 to 128 |
| Added glyph advance | 10 | 640 |
