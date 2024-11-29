function snakeToCamel(str: string): string {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (g) => g.toUpperCase())
    .replaceAll("_", "")
    .replaceAll("-", "");
}

export function snakeObjToCamel(obj: Record<string, string | undefined>): object {
  const newObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    Object.defineProperty(newObj, snakeToCamel(key), {
      value,
      enumerable: true,
    });
  });

  return newObj;
}
