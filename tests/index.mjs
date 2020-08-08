import { assertEqual } from '@windtunnel/assert';
import { iter } from '../dist/index.mjs';

export function testAllTrue() {
  const it = iter([1, 2, 3, 4]);
  const res = it.all((v) => v > 0);
  assertEqual(res, true);
}

export function testAllFalse() {
  const it = iter([1, 2, 3, 4]);
  const res = it.all((v) => v > 1);
  assertEqual(res, false);
}

export function testAllEmpty() {
  const it = iter([]);
  const res = it.all((v) => false);
  assertEqual(res, true);
}

export function testAnyTrue() {
  const it = iter([1, 2, 3, 4]);
  const res = it.all((v) => v > 0);
  assertEqual(res, true);
}

export function testAnyFalse() {
  const it = iter([1, 2, 3, 4]);
  const res = it.all((v) => v > 1);
  assertEqual(res, false);
}

export function testAnyEmpty() {
  const it = iter([]);
  const res = it.all((v) => v > 0);
  assertEqual(res, true);
}

export function testChain() {
  const it = iter([1, 2, 3, 4]);
  const res = it.chain([5, 6, 7, 8]);
  assertEqual(res.collect(), [
    1, 2, 3, 4, 5, 6, 7, 8,
  ]);
}

export function testCount() {
  const it = iter([1, 2, 3, 4]);
  const res = it.count();
  assertEqual(res, 4n);
}

export function testEnumerate() {
  const it = iter([1, 2, 3, 4]);
  const res = it.enumerate();
  assertEqual(res.collect(), [
    [0n, 1],
    [1n, 2],
    [2n, 3],
    [3n, 4],
  ]);
}

export function testFilter() {
  const it = iter([1, 2, 3, 4]);
  const res = it.filter((v) => (v & 1) === 1);
  assertEqual(res.collect(), [1, 3]);
}

export function testFind() {
  const it = iter([1, 2, 3, 4]);
  const res = it.find((v) => (v & 1) === 0);
  assertEqual(res, 2);
}

export function testFindEmpty() {
  const it = iter([]);
  const res = it.find((v) => (v & 1) === 0);
  assertEqual(res, null);
}

export function testFindNone() {
  const it = iter([1, 2, 3, 4]);
  const res = it.find((v) => v > 4);
  assertEqual(res, null);
}

export function testFold() {
  const it = iter([1, 2, 3, 4]);
  const res = it.fold((sum, v) => sum + v, 0);
  assertEqual(res, 10);
}

export function testFirst() {
  const it = iter([1, 2, 3, 4]);
  const res = it.first();
  assertEqual(res, 1);
}

export function testFirstEmpty() {
  const it = iter([]);
  const res = it.first();
  assertEqual(res, null);
}

export function testLast() {
  const it = iter([1, 2, 3, 4]);
  const res = it.last();
  assertEqual(res, 4);
}

export function testLastEmpty() {
  const it = iter([]);
  const res = it.last();
  assertEqual(res, null);
}

export function testMap() {
  const it = iter([1, 2, 3, 4]);
  const res = it.map((v) => v * 2);
  assertEqual(res.collect(), [2, 4, 6, 8]);
}

export function testNth() {
  const it = iter([1, 2, 3, 4]);
  const res = it.nth(1);
  assertEqual(res, 2);
}

export function testSkipN() {
  const it = iter([1, 2, 3, 4]);
  const res = it.skip(2);
  assertEqual(res.collect(), [3, 4]);
}

export function testSkipZero() {
  const it = iter([1, 2, 3, 4]);
  const res = it.skip(0);
  assertEqual(res.collect(), [1, 2, 3, 4]);
}

export function testSkipTooMany() {
  const it = iter([1, 2, 3, 4]);
  const res = it.skip(5);
  assertEqual(res.collect(), []);
}

export function testSkipWhile() {
  const it = iter([1, 2, 3, 4]);
  const res = it.skipWhile((v) => v < 3);
  assertEqual(res.collect(), [3, 4]);
}

export function testTakeN() {
  const it = iter([1, 2, 3, 4]);
  const res = it.take(2);
  assertEqual(res.collect(), [1, 2]);
}

export function testTakeZero() {
  const it = iter([1, 2, 3, 4]);
  const res = it.take(0);
  assertEqual(res.collect(), []);
}

export function testTakeTooMany() {
  const it = iter([1, 2, 3, 4]);
  const res = it.take(5);
  assertEqual(res.collect(), [1, 2, 3, 4]);
}

export function testTakeWhile() {
  const it = iter([1, 2, 3, 4]);
  const res = it.takeWhile((v) => v < 3);
  assertEqual(res.collect(), [1, 2]);
}
