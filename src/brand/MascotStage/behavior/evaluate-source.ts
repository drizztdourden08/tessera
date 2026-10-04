/* @layer renderer-components @kind logic */
import { restPose } from '../../motion/sample/rest-pose';
import { sampleClip } from '../../motion/sample/sample-clip';
import type { ClipPose, CompiledClip } from '../../motion/sample/sample.type';
import { blendPoses } from './blend-poses';
import { easeWeight } from './ease-weight';
import type { ClipSource, PoseSource, SourceContext } from './pose-source.type';

const stillPose = (clip: CompiledClip): ClipPose => new Map([...clip.still].map((part) => [part, restPose(1)]));

const clipElapsed = (source: ClipSource, now: number): number => Math.min((now - source.start) * source.rate, source.until);

const evaluateClip = (source: ClipSource, now: number, context: SourceContext): ClipPose => {
  if (context.reduced) return stillPose(source.clip);
  const restOf = (part: string, clip: CompiledClip): number => (context.effects.has(part) && !clip.still.has(part) ? 0 : 1);
  return sampleClip(source.clip, clipElapsed(source, now), 'hold', restOf, source.loop);
};

/** The pose a source shows at a moment on the stage clock. */
const evaluateSource = (source: PoseSource, now: number, context: SourceContext): ClipPose => {
  if (source.kind === 'clip') return evaluateClip(source, now, context);
  const from = evaluateSource(source.from, now, context);
  const to = evaluateSource(source.to, now, context);
  const t = now - source.start;
  return blendPoses(from, to, { body: easeWeight(t, source.body), extras: easeWeight(t, source.extras) }, context.effects);
};

export { evaluateSource };
