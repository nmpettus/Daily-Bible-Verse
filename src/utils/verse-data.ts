import { GOSPEL_SALVATION } from './categories/gospel-salvation';
import { GODS_ATTRIBUTES } from './categories/gods-attributes';
import { SPIRITUAL_WARFARE } from './categories/spiritual-warfare';
import { WORSHIP_PRAISE } from './categories/worship-praise';
import { CHRISTIAN_LIVING } from './categories/christian-living';
import { FAITH_TRUST } from './categories/faith-trust';
import { PRAYER_FASTING } from './categories/prayer-fasting';
import { PROMISES } from './categories/promises';
import { LOVE } from './categories/love';
import { REPENTANCE } from './categories/repentance';
import { HOPE } from './categories/hope';
import { WISDOM } from './categories/wisdom';
import { COMFORT } from './categories/comfort';
import { STRENGTH } from './categories/strength';
import { GUIDANCE } from './categories/guidance';
import type { VerseInfo } from '../types';

// Combine all category verses
export const VERSES_WITH_CATEGORIES: VerseInfo[] = [
  ...GOSPEL_SALVATION,
  ...GODS_ATTRIBUTES,
  ...SPIRITUAL_WARFARE,
  ...WORSHIP_PRAISE,
  ...CHRISTIAN_LIVING,
  ...FAITH_TRUST,
  ...PRAYER_FASTING,
  ...PROMISES,
  ...LOVE,
  ...REPENTANCE,
  ...HOPE,
  ...WISDOM,
  ...COMFORT,
  ...STRENGTH,
  ...GUIDANCE
];
