---
'@drizztdourden08/tessera': minor
---

DropdownMenu sub-menus open a small gap (`--menu-gap`, the corner radius) away from their parent and join it only at the open row, through a tunnel as tall as the row whose edges curve into both menus. Both menus keep their full border, halo and corners everywhere else; near a menu end the corner and the fillet share the room. The tunnel follows the row when the sub-menu opens on the left, moves to stay on screen, or nests. A safe area keeps a sub-menu open while the pointer heads for it across the gap and the parent's other rows. The `dropdown__join*` classes become `dropdown__tunnel*`.
