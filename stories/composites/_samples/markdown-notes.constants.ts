/* @layer stories @kind data */
const RELEASE_NOTE = `# Relic of the Past v0.16.0

A controllers release, with a fix for saved sessions.

## Controllers

- Rumble strength is adjustable per controller. Turn a weak pad up, or a harsh one down.
- Each controller card shows what the pad supports:
  - how it is connected
  - rumble
  - motion sensors
- A pad that does not work can be reported from its card. See [how a report is filed](https://example.com/rotp/controller-reports).

## Sessions

- A session resumes after a crash. Run \`rotp --resume\` to pick the last one by hand.
- The hint window no longer keeps an old hint after a reset.
`;

const HTML_NOTE = `# Brock v0.4.0

<!-- written by hand -->
A fix release. The <b>bold</b> tags here are dropped, and their word stays.

<script>document.title = 'changed';</script>

<div class="banner">A banner written in HTML is dropped whole.</div>

- [A web link](https://example.com/brock) stays a link.
- [A script link](javascript:void(0)) and a [file link](file:///C:/notes.txt) become plain text.
- An image becomes its text: ![the new update dialog](https://example.com/dialog.png)

| Table | Plain |
| --- | --- |
| shown | as text |
`;

const LONG_NOTE = `# Relic of the Past v0.15.0

A controllers release. Every pad now goes through one input layer, and a pad that does not work can be reported in a few steps.

## Controllers

- All controller input now runs through one input layer on every platform. The old input layer is gone.
- Controllers are identified against a community mapping database, so a new pad works without a manual mapping.
- Each controller card shows what the pad supports:
  - how it is connected
  - rumble
  - motion sensors
- Rumble strength is adjustable per controller. Turn a weak pad up, or a harsh one down.

## Reporting a controller that does not work

- Every controller card has a **Report this controller as not working** option. It records what your pad reports and files it for you.
- You review everything before it is sent.
- The guided run:
  1. reads your controller layout
  2. asks you to press each button and move each stick, showing you live what it sees
  3. takes a resting reading to measure stick drift

## Sessions

- A session resumes after a crash. Run \`rotp --resume\` to pick the last one by hand.
- The hint window no longer keeps an old hint after a reset.
- Calibration keeps the dead zones of the second stick.

## For hosts

- A host can set the seed of a session from the command line:

\`\`\`json
{ "seed": 4031, "players": 8 }
\`\`\`

- Read the [hosting guide](https://example.com/rotp/hosting) for the other options.
`;

const NOTE_SAMPLES = { 'Release note': RELEASE_NOTE, 'Raw HTML': HTML_NOTE, 'Long note': LONG_NOTE } as const;

export { HTML_NOTE, LONG_NOTE, NOTE_SAMPLES, RELEASE_NOTE };
