import { BookManager, RenderBooks, HandleSubmit } from './bookManager.js';
// create instance of bookManager
const manager = new BookManager();

// create instance of RenderBooks
const renderer = new RenderBooks();
renderer.books = manager.books; // pass the manager books into render books
renderer.manager = manager; // link manager to renderer
renderer.renderBooks(); // callingt the func


const handleSubmit = new HandleSubmit();
handleSubmit.books = manager.books;
handleSubmit.manager = manager; // link manager to handler
handleSubmit.renderer = renderer;
