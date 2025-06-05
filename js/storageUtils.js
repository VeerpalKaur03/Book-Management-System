// save and load using generics
// saves data to localStorage
export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
//load data from localStorage
export function loadFromStorage(key) {
    const item = localStorage.getItem(key);
    if (item) {
        return JSON.parse(item);
    }
    else {
        return null;
    }
}
