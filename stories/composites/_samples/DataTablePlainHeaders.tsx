/* @layer stories @kind component */
import { DataTablePlayerNote } from './DataTablePlayerNote';

const DataTablePlainHeaders = () => (
  <DataTablePlayerNote
    note="headerRules is false: no vertical rule sits between the header cells. Point at the edge of a header to see the rule and resize the column."
    headerRules={false}
  />
);

export { DataTablePlainHeaders };
