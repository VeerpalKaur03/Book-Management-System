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

const books = [];

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

form.addEventListener('submit', e => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();

  if (!title || !author || !isbn || !pubDate || !genre) {
    alert('Please fill in all fields.');
    return;
  }

  if (isNaN(isbn)) {
    alert('ISBN must be a number.');
    return;
  }

  const newBook = new Book(title, author, isbn, pubDate, genre);
  books.push(newBook);
  displayBooks();
  form.reset();
});

const displayBooks = () => {
  bookList.innerHTML = '';

  books.forEach((book, index) => {
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
};

