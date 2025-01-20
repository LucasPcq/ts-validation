export type OmitStrict<T, K extends keyof T> = Omit<T, K>;

export type PrettifyObject<O> = {
  [K in keyof O]: O[K];
} & {};
