/* @layer stories @kind data */
const SHORT_MESSAGE = 'Eight players are connected. Starting locks the player list.';

const LONG_PARAGRAPHS: readonly string[] = Array.from({ length: 14 }, (_, index) => (
  `Patch ${index + 1}: hosts now see which players dropped during the night, the server keeps the room open for ten minutes after the last player leaves, and the item log is archived with the seed so a run can be replayed from the first turn.`
));

const WIDE_README = `# Friday async

A weekly league slot for eight players on a shared seed.

- Casual: eight players on eu-west-2, a shared seed per night and an item log archived after ten minutes.
- Short: four players on eu-west-2, a shared seed per room and an item log archived when the room closes.
- Tournament: sixteen players on us-east-1, a fixed seed per round and an item log kept for the whole season.

\`\`\`text
tessera host --server eu-west-2 --preset casual --players 8 --seed shared --spectators on --reconnect 10m --log archive --log-after 10m --room-name friday-async
\`\`\`
`;

export { LONG_PARAGRAPHS, SHORT_MESSAGE, WIDE_README };
