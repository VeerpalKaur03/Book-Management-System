export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function loadFromStorage(key) {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}
