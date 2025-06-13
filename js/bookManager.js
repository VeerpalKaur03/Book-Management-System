var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Book } from "./models.js";
import { saveToStorage, loadFromStorage } from "./storageUtils.js";
import { LogMethod } from './decorators.js';
export class BookManager {
    constructor() {
        this.books = [];
        this.editIndex = null;
        this.loadBooks();
        this.renderBooks();
        const form = document.getElementById('bookForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }
    // get books 
    loadBooks() {
        const storedBooks = loadFromStorage('books');
        if (storedBooks) {
            this.books = storedBooks.map(b => new Book(b.title, b.author, b.isbn, b.pubDate, b.genre, b.price));
        }
    }
    // save
    saveBooks() {
        saveToStorage('books', this.books);
    }
    // get to ui
    renderBooks() {
        const bookList = document.getElementById("bookList");
        if (!bookList)
            return;
        bookList.innerHTML = '';
        this.books.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author.name}</td>  
                <td>${book.isbn}</td>
                <td>${book.pubDate}</td>
                <td>${book.genre}</td>
                <td>${book.price}</td>
                <td>${book.getDiscount(20)}</td>
                <td>${book.getAge()}</td>
                <td>
                  <button onclick="bookManager.editBook(${index})">Edit</button>
                  <button onclick="bookManager.deleteBook(${index})">Delete</button>
                </td>`;
            bookList.appendChild(row);
        });
    }
    // submit event
    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const title = form.elements.namedItem('title').value.trim();
        const authorName = form.elements.namedItem('author').value.trim();
        const isbn = form.elements.namedItem('isbn').value.trim();
        const pubDate = form.elements.namedItem('pubDate').value.trim();
        const genre = form.elements.namedItem('genre').value.trim();
        const priceStr = form.elements.namedItem('price').value.trim();
        const price = parseFloat(priceStr);
        // validations
        if (!title || !isbn || !pubDate || !genre || isNaN(price)) {
            alert('All fields are required and must be valid.');
            return;
        }
        const author = { name: authorName };
        const book = new Book(title, author, isbn, pubDate, genre, price);
        if (this.editIndex != null) {
            this.books[this.editIndex] = book;
            this.editIndex = null;
            form.querySelector('button[type="submit"]').textContent = 'Add Book';
        }
        else {
            this.books.push(book);
        }
        this.saveBooks();
        this.renderBooks();
        form.reset();
    }
    deleteBook(index) {
        if (confirm("Are you sure you want to remove this book?")) {
            this.books.splice(index, 1);
            this.saveBooks();
            this.renderBooks();
        }
    }
    editBook(index) {
        const book = this.books[index];
        const form = document.getElementById('bookForm');
        if (!form)
            return;
        form.elements.namedItem('title').value = book.title;
        form.elements.namedItem('author').value = book.author.name;
        form.elements.namedItem('isbn').value = book.isbn;
        form.elements.namedItem('pubDate').value = book.pubDate;
        form.elements.namedItem('genre').value = book.genre;
        form.elements.namedItem('price').value = book.price.toString();
        this.editIndex = index;
        form.querySelector('button[type="submit"]').textContent = 'Update Book';
    }
}
__decorate([
    LogMethod
], BookManager.prototype, "saveBooks", null);
__decorate([
    LogMethod
], BookManager.prototype, "deleteBook", null);
__decorate([
    LogMethod
], BookManager.prototype, "editBook", null);
