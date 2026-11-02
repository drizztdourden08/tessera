/* @layer stories @kind component */
import { DataTablePlayerNote } from './DataTablePlayerNote';

const DataTableNoFooter = () => (
  <DataTablePlayerNote
    note="footer is false: the count, the sort and group line and the options menu at the bottom are left out."
    footer={false}
  />
);

export { DataTableNoFooter };
