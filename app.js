class Book {
  constructor(title, author, isbn, pubDate, genre) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
  }

  getAge() {
    const pubYear = new Date(this.pubDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - pubYear;
  }
}

let books = [];

// this function can load or fetch daata 
async function loadBooks() {
  try {
    const response = await fetch('db.json');
    if (!response.ok) throw new Error('failed to fetch books');
     const data = await response.json();
    const storedBooks = localStorage.getItem('books');

    if (storedBooks) {
      // load from locxlStorage if available
      books = JSON.parse(storedBooks);
    } else {
      // else load from db.json and save to localStorage
      books = data;
      localStorage.setItem('books', JSON.stringify(books));
    }
    
    //get books from json or storage on ui
    renderBooks();
  } catch (error) {
    alert(error.message);
  }
}

function saveBooksToStorage() {
  return new Promise((resolve) => {
    localStorage.setItem('books', JSON.stringify(books));
    resolve();
  });
}

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');
let editIndex = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();

  // Simple input validation
  if (!title || !author || !isbn || !pubDate || !genre) {
    alert('All fields are required.');
    return;
  }

  if (isNaN(isbn)) {
    alert('ISBN must be a number.');
    return;
  }

  const book = new Book(title, author, isbn, pubDate, genre);

  if (editIndex !== null) {
    books[editIndex] = book;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
  } else {
    books.push(book);
  }

  await saveBooksToStorage();
  renderBooks();
  form.reset();
});

function renderBooks() {
  bookList.innerHTML = '';

  books.forEach((bookData, index) => {
    const book = new Book(
      bookData.title,
      bookData.author,
      bookData.isbn,
      bookData.pubDate,
      bookData.genre
    );

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.pubDate}</td>
      <td>${book.genre}</td>
      <td>${book.getAge()} years</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;

    bookList.appendChild(row);
  });
}

async function deleteBook(index) {
  books.splice(index, 1);
  await saveBooksToStorage();
  renderBooks();
}

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

// Load books on page load
loadBooks();
