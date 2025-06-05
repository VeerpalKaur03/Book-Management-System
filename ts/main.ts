import { BookManager } from "./bookManager.js";

const bookManager = new BookManager();

(window as any).bookManager = bookManager