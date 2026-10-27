---
'@drizztdourden08/tessera': minor
---

Card takes `flush`: no padding in the body, so a table or a list runs edge to edge, with the border and radius kept and the children clipped to the radius. ListItemRow takes `lead`, an id or a code in the first column before the name (it shares that column with `icon`), and `flat`, a dense row with no fill or border until hover or selection. Disclosure takes `end`, a slot at the right of the summary for a count or a Button; a click inside it never toggles the disclosure. InlineCreateForm takes `dashed`, which draws the box border dashed in the same colour and width. A filter chip that toggles is the existing Tag with `selected` and `onSelect`, and `grow={false}` on TextInput, SearchInput, Select and Combobox is the existing fixed-width prop, now written in the Select usage rules.
