import { Author, Book } from "./models.js";
import { saveToStorage, loadFromStorage } from "./storageUtils.js";
import { LogMethod } from './decorators.js';

export class BookManager {
    books: Book[] = [];
    editIndex: number | null = null;

    constructor() {
        this.loadBooks();
        this.renderBooks();

        const form = document.getElementById('bookForm') as HTMLFormElement | null;
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    loadBooks(): void {
        const storedBooks = loadFromStorage<any[]>('books');
        // if (storedBooks) {
        //     this.books = storedBooks.map(b =>
        //         new Book(b.title,  b.author , b.isbn, b.pubDate, b.genre, b.price)
        //     );
        // }
    }

    saveBooks(): void {
        saveToStorage('books', this.books);
    }

    renderBooks(): void {
        const bookList = document.getElementById("bookList") as HTMLElement | null;
        if (!bookList) return;

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

    handleSubmit(e: Event): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim();
        const authorName = (form.elements.namedItem('author') as HTMLInputElement).value.trim();
        const isbn = (form.elements.namedItem('isbn') as HTMLInputElement).value.trim();
        const pubDate = (form.elements.namedItem('pubDate') as HTMLInputElement).value.trim();
        const genre = (form.elements.namedItem('genre') as HTMLInputElement).value.trim();
        const priceStr = (form.elements.namedItem('price') as HTMLInputElement).value.trim();
        const price = parseFloat(priceStr);

        if (!title || !isbn || !pubDate || !genre || isNaN(price)) {
            alert('All fields are required and must be valid.');
            return;
        }

        const author: Author = { name: authorName };
        const book = new Book(title, author, isbn, pubDate, genre, price);

        if (this.editIndex != null) {
            this.books[this.editIndex] = book;
            this.editIndex = null;
            form.querySelector('button[type="submit"]')!.textContent = 'Add Book';
        } else {
            this.books.push(book);
        }

        this.saveBooks();
        this.renderBooks();
        form.reset();
    }

    @LogMethod
    deleteBook(index: number): void {
        if (confirm("Are you sure you want to remove this book?")) {
            this.books.splice(index, 1);
            this.saveBooks();
            this.renderBooks();
        }
    }

    @LogMethod
    editBook(index: number): void {
        const book = this.books[index];
        const form = document.getElementById('bookForm') as HTMLFormElement | null;
        if (!form) return;

        (form.elements.namedItem('title') as HTMLInputElement).value = book.title;
        (form.elements.namedItem('author') as HTMLInputElement).value = book.author.name;
        (form.elements.namedItem('isbn') as HTMLInputElement).value = book.isbn;
        (form.elements.namedItem('pubDate') as HTMLInputElement).value = book.pubDate;
        (form.elements.namedItem('genre') as HTMLInputElement).value = book.genre;
        (form.elements.namedItem('price') as HTMLInputElement).value = book.price.toString();

        this.editIndex = index;
        form.querySelector('button[type="submit"]')!.textContent = 'Update Book';
    }
}
