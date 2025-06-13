// savr to storage 
export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
// load from storage
export function loadFromStorage(key) {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}
