class Book {
  constructor(title, author, isbn, pubDate, genre, price) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
    this.price=price
  }
  // get discountt
  getDiscount(discountRate){
      return (this.price - (this.price * (discountRate / 100))).toFixed(2);
  }

  // get how much old the book is
  getAge(){
    return new Date().getFullYear() - new Date(this.pubDate).getFullYear()
  }

}
// use inheritence to extend properties from parent class
class EBook extends Book{
    constructor(title, author, isbn, pubDate, genre, format) {
      super(title, author, isbn, pubDate, genre)
      this.format=format
    }
}

class PrintedBook extends Book{
     constructor(title, author, isbn, pubDate, genre, dimensions) {
      super(title, author, isbn, pubDate, genre)
      this.dimensions=dimensions
    }
}

let books = [];




// loaded from html
const bookType=document.getElementById('bookType')
const formatInput=document.getElementById('format')
const dimensionsInput=document.getElementById('dimensions')


// use to change
function toggleDetails() {
  const type = bookType.value;

  if (type === 'EBook') {
    formatInput.style.display = 'inline-block';
    dimensionsInput.style.display = 'none';
  } else if (type === 'PrintedBook') {
    formatInput.style.display = 'none';
    dimensionsInput.style.display = 'inline-block';
  } 
}

// call the function
toggleDetails()
bookType.addEventListener('change', toggleDetails);





//fetch data
async function loadBooks() {

  try {
    // try to fetch from local storage
     let storedBooks= localStorage.getItem('books')
    
     //if data is in local Storage then parse it
     if(storedBooks){
        books= JSON.parse(storedBooks)
     } else{
        books=data 
        localStorage.setItem('books', JSON.stringify(books))
     }
    // print on ui
    renderBooks();
  } catch (error) {
    alert(error.message);
  }
}



// add
function saveBooksToStorage() {
  return new Promise((resolve) => {
    localStorage.setItem('books', JSON.stringify(books));
    resolve();
  });
}

const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

let editIndex = null;



// event listner on subit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const isbn = form.isbn.value.trim();
  const pubDate = form.pubDate.value;
  const genre = form.genre.value.trim();
  const price = form.price.value.trim();


  // input validations
  if (!title || !author || !isbn || !pubDate || !genre) {
    alert('All fields are required.');
    return;
  }

  if (isNaN(isbn)) {
    alert('ISBN must be a number.');
    return;
  }

  if(isNaN(price)){
    alert('Price should be a number.')
    return;
  }

  let book;
  if (bookType.value === 'EBook') {
    const format = form.format.value;
    book = new EBook(title, author, isbn, pubDate, genre, format);
  } else if (bookType.value === 'PrintedBook') {
    const dimensions = form.dimensions.value;
    book = new PrintedBook(title, author, isbn, pubDate, genre, dimensions);
  }
  // create object 

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




// render books
function renderBooks() {
  bookList.innerHTML = '';


  books.forEach((bookData, index) => {
      const book=new Book(bookData.title, bookData.author, bookData.isbn, bookData.pubDate, bookData.genre, bookData.price)

    const row = document.createElement('tr');
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
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
      </td>
    `;
    bookList.appendChild(row);
  });
}



//to delete
async function deleteBook(index) {
  let confirmm= alert('Are you sure you want to delete?')
  if(confirmm){
     books.splice(index, 1);
     await saveBooksToStorage();}
     else return;
  renderBooks();
}




// to edit
function editBook(index) {
  const book = books[index];

  form.title.value = book.title;
  form.author.value = book.author;
  form.isbn.value = book.isbn;
  form.pubDate.value = book.pubDate;
  form.genre.value = book.genre;
  form.price.value = book.price;

  editIndex = index;
  form.querySelector('button[type="submit"]').textContent = 'Update Book';
}


loadBooks();
