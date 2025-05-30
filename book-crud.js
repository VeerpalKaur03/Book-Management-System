//claass book

class Book {
  constructor(title, author, isbn, pubDate, genre) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
  }

// calculate the age
  getAge() {
    const pubYear = new Date(this.pubDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - pubYear;
  }
}

let books = [];
let editIndex = null;

// load book from storage
async function loadBooks() {
  books = await getBooksFromStorage();
  renderBooks();
}

// Fetch data from localStorage
function getBooksFromStorage() {
  return new Promise((resolve) => {
    const data = localStorage.getItem('books');
    resolve(data ? JSON.parse(data) : []);
  });
}

// Save data to localStorage
function saveBooksToStorage() {
  return new Promise((resolve) => {
    localStorage.setItem('books', JSON.stringify(books));
    resolve();
  });
}

// Sort by pubDAte
function sortBooks() {
  books.sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate));
  renderBooks();
}

// Add or update a book
async function handleBookSubmit(book) {
  if (editIndex !== null) {
    books[editIndex] = book;
    editIndex = null;
  } else {
    books.push(book);
  }
  await saveBooksToStorage();
  renderBooks();
}

// Delete a book
async function deleteBook(index) {
  books.splice(index, 1);
  await saveBooksToStorage();
  renderBooks();
}

// prepare form for edoit
function editBook(index) {
  const book = books[index];
  form.title.value = book.title;
  form.author.value = book.author;
  form.isbn.value = book.isbn;
  form.pubDate.value = book.pubDate;
  form.genre.value = book.genre;
  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = 'Update Book';
}
