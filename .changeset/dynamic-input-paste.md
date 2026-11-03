---
'@drizztdourden08/tessera': minor
---

DynamicInput now takes a whole value pasted into any slot. A full code such as ABCD-1234 or an address such as 192.168.0.1:8080 fills every slot at once, and the focus moves to the last filled slot. The text is split at the separators of the pattern when it has them, and by each slot's length or digit limit when it has none. Letter case and separators are ignored, and a choice slot matches an option by its value or its label. A value that a slot rejects does not fit, and the paste then lands in the one slot as before. New Storylite variant "Paste a full value" (I-96).
