/* @layer renderer-components @kind util */
import type { KanbanCardData, KanbanRun } from '../KanbanBoard.type';

const groupRuns = <Card extends KanbanCardData>(cards: readonly Card[]): KanbanRun<Card>[] =>
  cards.reduce<KanbanRun<Card>[]>((runs, card, at) => {
    const last = runs.at(-1);
    if (last && card.group !== undefined && last.group === card.group) {
      last.cards.push({ card, at });
      return runs;
    }
    runs.push({ group: card.group, cards: [{ card, at }] });
    return runs;
  }, []);

export { groupRuns };
