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

async function loadBooks() {
  try {
    const resp = await fetch('db.json');
    if (!resp.ok) throw new Error('Failed to load db.json');

    const jsonBooks = await resp.json();

    // Load from localStorage if available
    let storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    } else {
      books = jsonBooks;
      localStorage.setItem('books', JSON.stringify(books));
    }

    renderBooks();
  } catch (err) {
    alert(err.message);
  }
}

// add data 
function saveBook() {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('books', JSON.stringify(books));
      resolve('Saved');
    } catch (err) {
      reject(err);
    }
  });
}

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();

  if (!title || !author || !isbn || !pubDate || !genre) {
    alert('All fields are required.');
    return;
  }

  if (isNaN(isbn)) {
    alert('ISBN must be a number.');
    return;
  }

  const newBook = new Book(title, author, isbn, pubDate, genre);
  books.push(newBook);

  try {
    await saveBook();
    renderBooks();
    form.reset();
  } catch (err) {
    alert('Failed to save book.');
  }
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



loadBooks();

