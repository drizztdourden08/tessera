---
'@drizztdourden08/tessera': minor
---

The Argus mark is now a faceted stone shield with eye cutouts and an emerald corner, drawn at three detail levels: `BrandMarkData.detail` holds the medium and small cuts, and `BrandMark` picks the small cut at `sm`, the medium cut at `md`, `h26` and `h39`, and the full cut above. `BrandMark`, `Logo` and `Logo.Combined` gain `twin`, which draws `BrandInfo.twin`, the emerald twin of Argus with the same facets. New tokens `--brand-argus-emerald`, `--brand-argus-stone-*` and `--brand-argus-twin-*` (I-89).
