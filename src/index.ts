class Iter<T> implements Iterable<T> {
  private source: Iterable<T>;

  constructor(source: Iterable<T>) {
    this.source = source;
  }

  *[Symbol.iterator](): Iterator<T> {
    for (const item of this.source) {
      yield item;
    }
  }

  all(fn: (item: T) => boolean): boolean {
    return all(fn, this.source);
  }

  any(fn: (item: T) => boolean): boolean {
    return any(fn, this.source);
  }

  chain(iterable: Iterable<T>): Iterable<T> {
    return new Iter(chain(this.source, iterable));
  }

  count(): bigint {
    return count(this.source);
  }

  enumerate(): Iterable<[bigint, T]> {
    return new Iter(enumerate(this.source));
  }

  filter(fn: (item: T) => boolean): Iterable<T> {
    return new Iter(filter(fn, this.source));
  }

  find(fn: (item: T) => boolean): T | null {
    return find(fn, this.source);
  }

  fold<S>(fn: (state: S, item: T) => S, initial: S): S {
    return fold(fn, initial, this.source);
  }

  first(): T | null {
    return first(this.source);
  }

  last(): T | null {
    return last(this.source);
  }

  map<B>(fn: (item: T) => B): Iterable<B> {
    return new Iter(map(fn, this.source));
  }

  nth(n: number): T | null {
    return nth(n, this.source);
  }

  skip(n: number): Iterable<T> {
    return new Iter(skip(n, this.source));
  }

  skipWhile(fn: (item: T) => boolean): Iterable<T> {
    return new Iter(skipWhile(fn, this.source));
  }

  take(n: number): Iterable<T> {
    return new Iter(take(n, this.source));
  }

  takeWhile(fn: (item: T) => boolean): Iterable<T> {
    return new Iter(takeWhile(fn, this.source));
  }

  collect(): T[] {
    return [...this.source];
  }
}

class Wrap<T> implements Iterable<T> {
  private source: Iterator<T>;

  constructor(source: Iterator<T>) {
    this.source = source;
  }

  [Symbol.iterator]() {
    return this.source;
  }
}

const wrap = <T>(iterator: Iterator<T>): Iterable<T> => {
  return new Wrap(iterator);
};

function all<T>(fn: (item: T) => boolean, iterable: Iterable<T>): boolean {
  for (const item of iterable) {
    if (!fn(item)) {
      return false;
    }
  }
  return true;
}

function any<T>(fn: (item: T) => boolean, iterable: Iterable<T>): boolean {
  for (const item of iterable) {
    if (fn(item)) {
      return true;
    }
  }
  return false;
}

function* chain<T>(a: Iterable<T>, b: Iterable<T>): Iterable<T> {
  yield* a;
  yield* b;
}

function count<T>(iterable: Iterable<T>): bigint {
  let n = 0n;
  for (const _ of iterable) {
    n = n + 1n;
  }
  return n;
}

function* enumerate<T>(iterable: Iterable<T>): Iterable<[bigint, T]> {
  let i = 0n;
  for (const item of iterable) {
    yield [i, item];
    i = i + 1n;
  }
}

function* filter<T>(fn: (item: T) => boolean, iterable: Iterable<T>): Iterable<T> {
  for (const item of iterable) {
    if (fn(item)) {
      yield item;
    }
  }
}

function find<T>(fn: (item: T) => boolean, iterable: Iterable<T>): T | null {
  for (const item of iterable) {
    if (fn(item)) {
      return item;
    }
  }
  return null;
}

function fold<T, S>(fn: (state: S, item: T) => S, initial: S, iterable: Iterable<T>): S {
  let state: S = initial;
  for (const item of iterable) {
    state = fn(state, item);
  }
  return state;
}

function first<T>(iterable: Iterable<T>): T | null {
  for (const item of iterable) {
    return item;
  }
  return null;
}

function last<T>(iterable: Iterable<T>): T | null {
  let last: T | null = null;
  for (const item of iterable) {
    last = item;
  }
  return last;
}

function* map<T, B>(fn: (item: T) => B, iterable: Iterable<T>): Iterable<B> {
  for (const item of iterable) {
    yield fn(item);
  }
}

function nth<T>(n: number, iterable: Iterable<T>): T | null {
  for (const item of iterable) {
    if (n === 0) {
      return item;
    }
    n = n - 1;
  }
  return null;
}

function* skip<T>(n: number, iterable: Iterable<T>): Iterable<T> {
  const iterator = iterable[Symbol.iterator]();
  while (n > 0) {
    iterator.next();
    n = n - 1;
  }
  yield* wrap(iterator);
}

function* skipWhile<T>(fn: (item: T) => boolean, iterable: Iterable<T>): Iterable<T> {
  const iterator = iterable[Symbol.iterator]();
  let value: T;
  while (true) {
    const next = iterator.next();
    value = next.value;
    if (next.done || !fn(next.value)) {
      break;
    }
  }
  yield value;
  yield* wrap(iterator);
}

function* take<T>(n: number, iterable: Iterable<T>): Iterable<T> {
  for (const item of iterable) {
    if (n > 0) {
      yield item;
    } else {
      break;
    }
    n = n - 1;
  }
}

function* takeWhile<T>(fn: (item: T) => boolean, iterable: Iterable<T>): Iterable<T> {
  for (const item of iterable) {
    if (fn(item)) {
      yield item;
    } else {
      break;
    }
  }
}

export const iter = <T>(iterable: Iterable<T>): Iterable<T> => {
  return new Iter(iterable);
};
