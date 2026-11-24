/* @layer stories @kind component */
import { BrandMark } from '../../../src/brand';
import { TypeMark } from '../../../src/primitives/TypeMark';

const RecordCardDemoIcon = ({ brand }: { brand: boolean }) =>
  brand ? <BrandMark app="archipelia" size="sm" /> : <TypeMark icon="bug" label="Bug" tone="danger" />;

export { RecordCardDemoIcon };
