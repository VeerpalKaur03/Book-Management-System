import { Book } from "./models.js";
//High-level modules (RenderBooks, BookManager, HandleSubmit) depend on interfaces (IBook & Describe), not concrete classes (Book, EBook)... DIP
export class BookManager {
    constructor() {
        this.books = [];
        this.editIndex = null;
        this.loadBooks();
    }
    // load 
    loadBooks() {
        const data = localStorage.getItem("books");
        if (data) {
            const plainBooks = JSON.parse(data);
            this.books = plainBooks.map((b) => new Book(b.title, b.author, b.isbn, b.pubDate, b.genre, b.price));
        }
    }
    //save
    saveBooks() {
        localStorage.setItem("books", JSON.stringify(this.books));
    }
    //edit
    editBook(index) {
        this.editIndex = index;
        const book = this.books[index];
        const form = document.getElementById("bookForm");
        form.elements.namedItem("title").value = book.title;
        form.elements.namedItem("author").value = book.author;
        form.elements.namedItem("isbn").value = book.isbn;
        form.elements.namedItem("pubDate").value = book.pubDate;
        form.elements.namedItem("genre").value = book.genre;
        form.elements.namedItem("price").value = book.price.toString();
        form.querySelector('button[type="submit"]').textContent = "Update Book";
    }
    //delete
    deleteBook(index) {
        if (confirm("Are you sure you want to remove this book?")) {
            this.books.splice(index, 1);
            this.saveBooks();
        }
    }
}
export class RenderBooks {
    constructor() {
        this.books = [];
        this.manager = null; // reference to BookManager for editt/delete
    }
    renderBooks() {
        const bookList = document.getElementById("bookList");
        bookList.innerHTML = "";
        this.books.forEach((book, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>  
                <td>${book.isbn}</td>
                <td>${book.pubDate}</td>
                <td>${book.genre}</td>
                <td>${book.price}</td>
                <td>${book.getDiscount(20)}</td>
                <td>${book.getAge()}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>`;
            bookList.appendChild(row);
        });
        // add edit event listeners
        bookList.querySelectorAll(".edit").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                var _a;
                const index = Number(e.target.getAttribute("data-index"));
                (_a = this.manager) === null || _a === void 0 ? void 0 : _a.editBook(index);
            });
        });
        //  delete event listeners
        bookList.querySelectorAll(".delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                var _a, _b;
                const index = Number(e.target.getAttribute("data-index"));
                (_a = this.manager) === null || _a === void 0 ? void 0 : _a.deleteBook(index);
                (_b = this.manager) === null || _b === void 0 ? void 0 : _b.saveBooks();
                this.renderBooks();
            });
        });
    }
}
// submit logic
export class HandleSubmit {
    constructor() {
        this.books = [];
        this.manager = null; // Reference to BookManager
        this.renderer = null; // reference to RenderBooks
        const form = document.getElementById("bookForm");
        if (form) {
            form.addEventListener("submit", this.handleSubmit.bind(this));
        }
    }
    handleSubmit(e) {
        var _a;
        e.preventDefault();
        const form = e.target;
        const title = form.elements.namedItem("title").value.trim();
        const author = form.elements.namedItem("author").value.trim();
        const isbn = form.elements.namedItem("isbn").value.trim();
        const pubDate = form.elements.namedItem("pubDate").value.trim();
        const genre = form.elements.namedItem("genre").value.trim();
        const priceStr = form.elements.namedItem("price").value.trim();
        const price = parseFloat(priceStr);
        // input validationss
        if (!title || !isbn || !pubDate || !genre || isNaN(price)) {
            alert("All fields are required and must be valid.");
            return;
        }
        // if (!this.manager) return;
        const book = new Book(title, author, isbn, pubDate, genre, price);
        console.log(book.describe());
        if (this.manager.editIndex !== null) {
            this.books[this.manager.editIndex] = book;
            this.manager.editIndex = null;
            form.querySelector('button[type="submit"]').textContent = "Add Book";
        }
        else {
            this.books.push(book);
        }
        this.manager.saveBooks();
        form.reset();
        (_a = this.renderer) === null || _a === void 0 ? void 0 : _a.renderBooks();
    }
}
