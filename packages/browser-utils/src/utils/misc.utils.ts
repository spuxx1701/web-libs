/**
 * Returns a promise that resolves after the given amount of milliseconds.
 * @param ms The amount of milliseconds.
 *
 * @example
 * await sleep(1000);
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks whether the given value is null, undefined or a string that contains only whitespace characters.
 * @param value The value to check.
 *
 * @example
 * isEmptyOrWhitespace(''); // true
 * isEmptyOrWhitespace(' '); // true
 * isEmptyOrWhitespace(undefined); // true
 * isEmptyOrWhitespace(null); // true
 * isEmptyOrWhitespace('foo'); // false
 * isEmptyOrWhitespace(0); // false
 * isEmptyOrWhitespace({}); // false
 * isEmptyOrWhitespace([]); // false
 * isEmptyOrWhitespace(false); // false
 */
export function isEmptyOrWhitespace(value: unknown) {
  if (typeof value === 'string') {
    return value.trim() === '';
  } else if (value === undefined || value === null) {
    return true;
  } else {
    return false;
  }
}

type RecursiveObject = {
  [key: string]: string | RecursiveObject;
};

/**
 * Recursively merges properties of source objects into the target object.
 * If a property is an object, it will be merged rather than replaced.
 * If a property is an array, it will be replaced rather than merged.
 *
 * @param target - The target object to which properties will be merged.
 * @param sources - The source objects from which properties will be merged.
 * @returns The target object.
 *
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * const merged = deepMerge(obj1, obj2);
 * console.log(merged); // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export function deepMerge(...sources: Array<RecursiveObject | string>): RecursiveObject {
  const target: RecursiveObject = {};

  if (!sources.length) return target;

  for (const source of sources) {
    if (typeof source === 'object') {
      for (const k in source) {
        const key = k as keyof object;
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          target[key] = deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  }

  return target;
}
