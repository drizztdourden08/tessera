---
'@drizztdourden08/tessera': minor
---

WizardDialog takes a `size` (`md`, `wide`, `lg` or `xl`, from 640 to 1024 px; the default `wide` is the 768 px it always had). Wizard and WizardDialog take a `busy` that holds Back, Next, Finish and the step list and shows the step's busy hint while the app works on something async. `wizard.goTo(id, { force: true })` moves to a step past the usual checks, for when that work is done.
