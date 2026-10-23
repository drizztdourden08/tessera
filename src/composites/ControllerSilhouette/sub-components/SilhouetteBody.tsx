/* @layer renderer-components @kind component */
import { SvgClipPath, SvgGroup, SvgPath } from '../../../primitives/Svg';
import type { SilhouetteArtProps } from '../ControllerSilhouette.type';

const SilhouetteBody = (props: SilhouetteArtProps) => {
  const { drawing, ids } = props;
  const sheen = `url(#${ids.sheen})`;

  return (
    <SvgGroup className="controller-silhouette__shell">
      {drawing.parts.map((part, index) => (
        <SvgGroup key={index} className={`controller-silhouette__part controller-silhouette__part--${part.kind}`}>
          <SvgPath className="controller-silhouette__part-fill" d={part.d} />
          <SvgPath className="controller-silhouette__sheen" d={part.d} fill={sheen} />
        </SvgGroup>
      ))}
      <SvgClipPath id={ids.clip}>
        <SvgPath d={drawing.body} />
      </SvgClipPath>
      <SvgPath className="controller-silhouette__body" d={drawing.body} />
      <SvgPath className="controller-silhouette__sheen" d={drawing.body} fill={sheen} />
      <SvgPath className="controller-silhouette__bevel" d={drawing.body} stroke={`url(#${ids.bevel})`} clipPath={`url(#${ids.clip})`} />
      <SvgPath className="controller-silhouette__edge" d={drawing.body} />
    </SvgGroup>
  );
};

export { SilhouetteBody };
