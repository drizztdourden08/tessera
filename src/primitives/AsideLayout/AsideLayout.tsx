/* @layer renderer-components @kind component */
import './AsideLayout.css';
import { ASIDE_BREAKPOINT_DEFAULT } from './AsideLayout.constants';
import type { AsideLayoutProps } from './AsideLayout.type';
import { useAsideShown } from './behavior/useAsideShown';

const AsideLayout = (props: AsideLayoutProps) => {
  const { main, aside, asideWidth = 'md', breakpoint = ASIDE_BREAKPOINT_DEFAULT, side = 'end', onAsideChange, asideLabel, className = '' } = props;
  const { ref, shown } = useAsideShown({ breakpoint, onAsideChange });
  return (
    <div ref={ref} className={`aside-layout${className ? ` ${className}` : ''}`} data-side={side} data-aside-width={asideWidth}>
      <div className="aside-layout__main">{main}</div>
      {shown && <aside className="aside-layout__aside" aria-label={asideLabel}>{aside}</aside>}
    </div>
  );
};

export { AsideLayout };
