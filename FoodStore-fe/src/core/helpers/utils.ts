export const getLocalStorage = (key: string, defaultValue: unknown, isParseJson = false) => {
  try {
    return isParseJson
      ? JSON.parse(localStorage.getItem(key) ?? '')
      : localStorage.getItem(key)
  } catch (err) {
    return defaultValue;
  }
}

export const filterObjectValue = <T>(object: T): Partial<T> => {
  const newObject: Partial<T> = {};
  Object.entries(object).forEach(([key, value]) => {
    if ((value && !Array.isArray(value) && typeof value !== 'number') || (Array.isArray(value) && value.length !== 0) || (typeof value === 'number' && +value > -1)) {
      newObject[key as keyof T] = value;
    }
  })
  return newObject;
}


export const updateItemArray = <T>(data: T, arr: T[], ...index: (keyof T)[]) => {
  const idx = arr.findIndex(item => index.every(key => data[key] === item[key]));
  if (idx > -1) {
    arr.splice(idx, 1, data);
  } else {
    arr.unshift(data);
  }
  console.log('arrr', arr);
  return arr.slice();
}