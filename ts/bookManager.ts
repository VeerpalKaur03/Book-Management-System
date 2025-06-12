import { Book, IBook, Describe } from "./models.js";


//High-level modules (RenderBooks, BookManager, HandleSubmit) depend on interfaces (IBook & Describe), not concrete classes (Book, EBook)... DIP
export class BookManager {
    books: (IBook & Describe)[] = [];
    editIndex: number | null = null;

    constructor() {
        this.loadBooks();
    }

    // load 
    loadBooks(): void {
        const data = localStorage.getItem("books");
        if (data) {
            const plainBooks = JSON.parse(data);
            this.books = plainBooks.map((b: any) =>
                new Book 
          (b.title, b.author, b.isbn, b.pubDate, b.genre, b.price)
      );
        }
    }
    
    //save
    saveBooks(): void {
        localStorage.setItem("books", JSON.stringify(this.books));
    }



    //edit
    editBook(index: number): void {
        this.editIndex = index;
        const book = this.books[index];
        const form = document.getElementById("bookForm") as HTMLFormElement;

        (form.elements.namedItem("title") as HTMLInputElement).value = book.title;
        (form.elements.namedItem("author") as HTMLInputElement).value = book.author;
        (form.elements.namedItem("isbn") as HTMLInputElement).value = book.isbn;
        (form.elements.namedItem("pubDate") as HTMLInputElement).value = book.pubDate;
        (form.elements.namedItem("genre") as HTMLInputElement).value = book.genre;
        (form.elements.namedItem("price") as HTMLInputElement).value = book.price.toString();

        form.querySelector('button[type="submit"]')!.textContent = "Update Book";
    }
    
    //delete
    deleteBook(index: number): void {
        if (confirm("Are you sure you want to remove this book?")) {
            this.books.splice(index, 1);
            this.saveBooks();
        }
    }

}


export class RenderBooks {
    books: (IBook & Describe)[] = [];
    manager: BookManager | null = null;  // reference to BookManager for editt/delete

    renderBooks(): void {
        const bookList = document.getElementById("bookList") as HTMLElement;
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
                const index = Number((e.target as HTMLElement).getAttribute("data-index"));
                this.manager?.editBook(index);
            });
        });


        //  delete event listeners
        bookList.querySelectorAll(".delete").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = Number((e.target as HTMLElement).getAttribute("data-index"));
                this.manager?.deleteBook(index);
                this.manager?.saveBooks();
                this.renderBooks();
            });
        });
    }
}


// submit logic
export class HandleSubmit {
    books: (IBook & Describe)[] = [];
    manager: BookManager | null = null;  // Reference to BookManager
    renderer : RenderBooks | null = null;  // reference to RenderBooks

    constructor() {
        const form = document.getElementById("bookForm") as HTMLFormElement;
        if (form) {
            form.addEventListener("submit", this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e: Event) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
        const author = (form.elements.namedItem("author") as HTMLInputElement).value.trim();
        const isbn = (form.elements.namedItem("isbn") as HTMLInputElement).value.trim();
        const pubDate = (form.elements.namedItem("pubDate") as HTMLInputElement).value.trim();
        const genre = (form.elements.namedItem("genre") as HTMLInputElement).value.trim();
        const priceStr = (form.elements.namedItem("price") as HTMLInputElement).value.trim();
        const price = parseFloat(priceStr);

        // input validationss
        if (!title || !isbn || !pubDate || !genre || isNaN(price)) {
            alert("All fields are required and must be valid.");
            return;
        }
        
        // if (!this.manager) return;

        const book = new Book(title, author, isbn, pubDate, genre, price);
        console.log(book.describe())

        if (this.manager.editIndex !== null) {
            this.books[this.manager.editIndex] = book;
            this.manager.editIndex = null;
            form.querySelector('button[type="submit"]')!.textContent = "Add Book";
        } else {
            this.books.push(book);
        }
        

        this.manager.saveBooks();
        form.reset();

        this.renderer?.renderBooks()
    }
}

