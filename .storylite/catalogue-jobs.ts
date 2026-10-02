/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import type { CatalogueTier } from './catalogue.type';
import { ESCAPED, USAGE_JOB, USAGE_SUFFIX } from './usage-job.constants';
import { walkFiles } from './walk-files';

const usageJobs = (root: string): Map<string, string> => {
  const jobs = new Map<string, string>();
  for (const file of walkFiles(path.join(root, 'src')).filter((f) => f.endsWith(USAGE_SUFFIX))) {
    const job = USAGE_JOB.exec(fs.readFileSync(file, 'utf8'))?.[2];
    if (job) jobs.set(path.basename(file, USAGE_SUFFIX), job.replace(ESCAPED, '$1'));
  }
  return jobs;
};

const withUsageJobs = (root: string, tiers: readonly CatalogueTier[]): readonly CatalogueTier[] => {
  const jobs = usageJobs(root);
  return tiers.map((tier) => ({
    ...tier,
    groups: tier.groups.map((group) => ({
      ...group,
      entries: group.entries.map((entry) => ({ ...entry, summary: jobs.get(entry.name) ?? entry.summary })),
    })),
  }));
};

export { withUsageJobs };
