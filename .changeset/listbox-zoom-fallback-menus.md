---
"@drizztdourden08/tessera": patch
---

Select, Combobox and DropdownMenu lists keep their width and the join with their trigger inside a page scaled with CSS `zoom`. Without CSS anchor positioning, DropdownMenu sub-menus are no longer cut off from the second level on.
