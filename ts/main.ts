import { BookManager } from "./bookManager.js";

const bookManager = new BookManager();
(window as any).bookManager = bookManager; // Expose globally so inline button handlers can access it (if needed)
