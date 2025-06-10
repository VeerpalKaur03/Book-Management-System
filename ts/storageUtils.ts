export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromStorage<T>(key: string): T | null {
  const json = localStorage.getItem(key);
    return JSON.parse(json) as T;
}
