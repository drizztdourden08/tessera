/* @layer renderer-components @kind component */
import './TermList.css';
import type { TermListProps } from './TermList.type';

const TermList = (props: TermListProps) => {
  const { items, className = '' } = props;

  return (
    <dl className={`term-list${className ? ` ${className}` : ''}`}>
      {items.map(({ term, detail }) => (
        <div className="term-list__item" key={term}>
          <dt className="term-list__term">{`${term}:`}</dt>
          <dd className="term-list__detail">{detail}</dd>
        </div>
      ))}
    </dl>
  );
};

export { TermList };
