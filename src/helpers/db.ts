import { Knex } from 'knex';

export function allRefs(refs: Record<string, () => Knex.Ref<string, object>>) {
  return Object.values(refs).map(ref => ref());
}
