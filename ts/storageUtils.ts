// save and load using generics
// saves data to localStorage
export function saveToStorage<T>(key:string, data:T){
    localStorage.setItem(key, JSON.stringify(data))
}


//load data from localStorage
export function loadFromStorage<T>(key:string): T | null{
   const item = localStorage.getItem(key);
   if(item){
      return JSON.parse(item) as T
   }else{
    return null
   }
}