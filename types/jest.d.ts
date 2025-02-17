declare namespace jest {
  interface Matchers<R> {
    toBe(expected: any): R;
    toEqual(expected: any): R;
    toMatch(expected: string | RegExp): R;
    toBeDefined(): R;
    toBeUndefined(): R;
    toBeNull(): R;
    toBeTruthy(): R;
    toBeFalsy(): R;
    toContain(item: any): R;
    toHaveLength(length: number): R;
    toHaveProperty(keyPath: string | Array<string>, value?: any): R;
    toBeCloseTo(expected: number, precision?: number): R;
    toBeGreaterThan(expected: number): R;
    toBeGreaterThanOrEqual(expected: number): R;
    toBeLessThan(expected: number): R;
    toBeLessThanOrEqual(expected: number): R;
    toThrow(error?: string | RegExp | Error): R;
    toThrowError(error?: string | RegExp | Error): R;
  }
}