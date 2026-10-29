/* @layer stories @kind story */
import { Card, Table, TableCell, TableRow, TableSection } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';

const PLAYERS: readonly (readonly [string, string])[] = [['Link', '212'], ['Zelda', '188'], ['Impa', '97']];

const PlayersCard = ({ headed }: { headed: boolean }) => (
  <Card flush title={headed ? 'Players' : undefined}>
    <Table aria-label="Players">
      <TableSection head>
        <TableRow>
          <TableCell header>Player</TableCell>
          <TableCell header align="right">Checks</TableCell>
        </TableRow>
      </TableSection>
      <TableSection>
        {PLAYERS.map(([name, checks]) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{checks}</TableCell>
          </TableRow>
        ))}
      </TableSection>
    </Table>
  </Card>
);

const CardFlush = () => (
  <Demonstrator rows={axis(['plain', 'headed'] as const)} align="stretch" cell={(look) => <PlayersCard headed={look === 'headed'} />} />
);

export { CardFlush };
