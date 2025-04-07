import type { Brand, Entries } from '@/types/utils';

export function toBrand<T extends string, U = string>(value: U): Brand<T, U> {
  return value as Brand<T, U>;
}

export function unwrapBrand<T extends string, U = string>(value: Brand<T, U>): U {
  return value as U;
}

export function getKeys<T extends Record<string, unknown>>(obj: T): Array<keyof T> {
  return Object.keys(obj);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getValues<T extends Record<string, any>>(obj: T): Array<T[keyof T]> {
  return Object.values(obj);
}

export function getEntries<T extends Record<string, unknown>>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export function fromEntries<T extends Record<string, unknown>>(entries: Entries<T>): T {
  return Object.fromEntries(entries) as T;
}
