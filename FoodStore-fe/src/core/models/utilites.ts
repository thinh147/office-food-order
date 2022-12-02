export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export type PickAndFlatten<T, K extends keyof T> = UnionToIntersection<T[K]>;

export function pickAndFlatten<T, K extends keyof T>(o: T, keys: K[]): PickAndFlatten<T, K> {
  // Untested implementation
  const entries = Object.entries(o)
    .filter(([k, v]) => keys.includes(k as K))
    .map(([k, v]) => v);

  return Object.assign({}, entries) as any;
}
