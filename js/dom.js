// used to display books on UI
function renderBooks() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';

  books.forEach((bookData, index) => {
    let book;
    // what type of the book
    if (bookData.type === 'EBook') {
      book = new EBook(bookData.title, bookData.author, bookData.isbn, bookData.pubDate, bookData.genre, bookData.price, bookData.format);
    } else if (bookData.type === 'PrintedBook') {
      book = new PrintedBook(bookData.title, bookData.author, bookData.isbn, bookData.pubDate, bookData.genre, bookData.price, bookData.dimensions);
    } else {
      book = new Book(bookData.title, bookData.author, bookData.isbn, bookData.pubDate, bookData.genre, bookData.price);
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.pubDate}</td>
      <td>${book.genre}</td>
      <td>Rs. ${book.price}</td>
      <td>${book.getDiscountRate()}%</td>
      <td>${book.getDiscountedPrice()}</td>
      <td>${book.getAge()}</td>
      <td>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}

// toggle fields on UI
function toggleDetails() {
  const bookType = document.getElementById('bookType').value;
  document.getElementById('format').style.display = bookType === 'EBook' ? 'inline-block' : 'none';
  document.getElementById('dimensions').style.display = bookType === 'PrintedBook' ? 'inline-block' : 'none';
}
