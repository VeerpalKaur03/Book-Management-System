let editIndex = null;

// event listner 
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  
  const type = form.bookType.value;
  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();
  const price = parseFloat(form.price.value.trim());
 
  if (!title || !author || !isbn || !pubDate || !genre || isNaN(price)) {
    alert('All fields are required and must be valid.');
    return;
  }
  // input from user
  let book;
  if (type === 'EBook') {
    const format = form.format.value.trim();
    if (!format) return alert("Format is required for EBook");
    book = new EBook(title, author, isbn, pubDate, genre, price, format);

  } else if (type === 'PrintedBook') {
    const dimensions = form.dimensions.value.trim();
    if (!dimensions) return alert("Dimensions are required for PrintedBook");
    book = new PrintedBook(title, author, isbn, pubDate, genre, price, dimensions);

  } else {
    book = new Book(title, author, isbn, pubDate, genre, price);
  }

  if (editIndex !== null) {
    books[editIndex] = book;
    editIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Add Book';
  } else {
    books.push(book);
  }

  saveBooks();
  renderBooks();
  form.reset();
  toggleDetails();
}

// function to delete a book
function deleteBook(index) {
  if (confirm('Are you sure you want to delete?')) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
  }
}

// to edit a book
function editBook(index) {
  const form = document.getElementById('bookForm');
  const book = books[index];

  form.bookType.value = book.type;
  toggleDetails();

  form.title.value = book.title;
  form.author.value = book.author;
  form.isbn.value = book.isbn;
  form.pubDate.value = book.pubDate;
  form.genre.value = book.genre;
  form.price.value = book.price;

  if (book.type === 'EBook') {
    form.format.value = book.format;
  } else if (book.type === 'PrintedBook') {
    form.dimensions.value = book.dimensions;
  }

  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = 'Update Book';
}
