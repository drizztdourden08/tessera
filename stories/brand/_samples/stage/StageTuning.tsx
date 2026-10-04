/* @layer stories @kind component */
import { useCallback, useMemo, useState } from 'react';
import { AUTONOMY_RULES, MascotStage } from '../../../../src/brand';
import type { AutonomyConfig, MascotStageCast, MascotStageEvent } from '../../../../src/brand';
import { Flex, Grid, SegmentedControl, Slider, Stack, Text } from '../../../../src/primitives';
import { MASCOT_OPTIONS, STAGE_MASCOTS } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';

interface Tuning {
  weights: Readonly<Record<string, number>>;
  cooldowns: Readonly<Record<string, number>>;
  pause: readonly [number, number];
  napAfter: number;
}

const DEFAULT: Tuning = {
  weights: Object.fromEntries(AUTONOMY_RULES.map((r) => [r.id, r.id === 'nap' ? 50 : r.weight])),
  cooldowns: Object.fromEntries(AUTONOMY_RULES.map((r) => [r.id, r.cooldown / 1000])),
  pause: [1.8, 5.2],
  napAfter: 45,
};

const configOf = (t: Tuning, seed: number): AutonomyConfig => ({
  seed,
  pause: [t.pause[0] * 1000, Math.max(t.pause[0], t.pause[1]) * 1000],
  napAfter: t.napAfter * 1000,
  rules: AUTONOMY_RULES.map((r) => ({ ...r, weight: t.weights[r.id] ?? r.weight, cooldown: (t.cooldowns[r.id] ?? r.cooldown / 1000) * 1000 })),
});

const seconds = (n: number): string => `${n} s`;

/** Live sliders for each mascot's autonomous mode: rule weights, cooldowns, the pause between behaviours, nap time. */
const StageTuning = () => {
  const [who, setWho] = useState<MascotKey>('sentri');
  const [tunings, setTunings] = useState<Record<MascotKey, Tuning>>({ sentri: DEFAULT, flint: DEFAULT, pelago: DEFAULT });
  const [picked, setPicked] = useState<Record<string, number>>({});
  const tuning = tunings[who];
  const update = (patch: Partial<Tuning>) => setTunings((all) => ({ ...all, [who]: { ...all[who], ...patch } }));
  const cast = useMemo<MascotStageCast[]>(() => STAGE_MASCOTS.map((m, i) => ({ id: m.key, brand: m.brand, autonomy: configOf(tunings[m.key], i + 3) })), [tunings]);
  const onEvent = useCallback((e: MascotStageEvent) => {
    if (e.type === 'behaviour' && e.behaviour) setPicked((counts) => ({ ...counts, [`${e.actor} ${e.behaviour}`]: (counts[`${e.actor} ${e.behaviour}`] ?? 0) + 1 }));
  }, []);
  return (
    <Stack gap="md">
      <div className="stage-lab__frame stage-lab__frame--plain">
        <MascotStage cast={cast} height={160} onEvent={onEvent} label="Mascots on their own" />
      </div>
      <Flex gap="md" align="end" wrap>
        <SegmentedControl label="Tune" size="sm" value={who} options={MASCOT_OPTIONS} onChange={setWho} />
        <div className="stage-lab__control"><Slider label="Pause between behaviours" size="sm" range value={[tuning.pause[0], tuning.pause[1]]} min={0.2} max={12} step={0.2} showValue formatValue={seconds} onChange={(p) => update({ pause: p })} /></div>
        <div className="stage-lab__control"><Slider label="Nap after quiet for" size="sm" value={tuning.napAfter} min={5} max={120} step={5} showValue formatValue={seconds} onChange={(n) => update({ napAfter: n })} /></div>
      </Flex>
      <Grid columns={3} gap="md">
        {AUTONOMY_RULES.map((r) => (
          <Stack key={r.id} gap="xs">
            <Text variant="overline">{`${r.id} · picked ${picked[`${who} ${r.id}`] ?? 0} times`}</Text>
            <div className="stage-lab__control"><Slider label="Weight" size="sm" value={tuning.weights[r.id] ?? r.weight} min={0} max={r.id === 'nap' ? 100 : 10} step={0.2} showValue onChange={(n) => update({ weights: { ...tuning.weights, [r.id]: n } })} /></div>
            <div className="stage-lab__control"><Slider label="Cooldown" size="sm" value={tuning.cooldowns[r.id] ?? 0} min={0} max={60} step={1} showValue formatValue={seconds} onChange={(n) => update({ cooldowns: { ...tuning.cooldowns, [r.id]: n } })} /></div>
          </Stack>
        ))}
      </Grid>
    </Stack>
  );
};

export { StageTuning };
