export function removeDuplicates<T extends Record<string, any>>(
  arr: T[],
  propForCheck: string
): T[] {
  const newArray: T[] = [];
  const uniqueObject: Record<string, T> = {};

  for (const item of arr) {
    const objTitle = item[propForCheck];
    uniqueObject[objTitle] = item;
  }
  for (const i of Object.keys(uniqueObject)) {
    newArray.push(uniqueObject[i]);
  }
  return newArray;
}
