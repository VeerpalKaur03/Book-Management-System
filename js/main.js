import { BookManager } from "./bookManager.js";
const bookManager = new BookManager();
window.bookManager = bookManager; // Expose globally so inline button handlers can access it (if needed)
