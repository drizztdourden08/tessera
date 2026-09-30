---
'@drizztdourden08/tessera': minor
---

New input device composites from Brock's input tester. `CalibrationPanel` is the frame of one calibration step: a title, an instruction, a live monospace readout, the step content, then Cancel and one step action. `PressedGrid` is a grid of button cells that light up while their id is in `pressed`. `StickPlot` draws an analog stick position from plain `x` and `y`, with optional inner and outer dead zones, a measured `range`, a recorded `center` and a larger `lg` size. A trigger reading needs no new part: a `StatRow` with `mono` over a `ProgressBar` with `live`, as the ProgressBar gallery shows.
