/* @layer stories @kind types */
import type { CodeBlockLanguage } from '../../../src/primitives';

interface GuideTopic {
  title: string;
  points: readonly string[];
  code?: string;
  language?: CodeBlockLanguage;
}

interface GuideExample {
  name: string;
  code: string;
}

interface Guide {
  name: string;
  description: string;
  points: readonly string[];
  instead?: string;
  topics: readonly GuideTopic[];
  example: GuideExample;
}

interface GuideTopicViewProps {
  topic: GuideTopic;
}

export type { Guide, GuideTopic, GuideTopicViewProps };
