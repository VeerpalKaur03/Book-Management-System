//class
class Book {
  constructor(title, author, isbn, pubDate, genre, price) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
    this.price = price;
  }
  // function to calculate discount
  getDiscount(discountRate) {
    return (this.price - (this.price * (discountRate / 100))).toFixed(2);
  }

  // function to get age of the book
  getAge() {
    return new Date().getFullYear() - new Date(this.pubDate).getFullYear();
  }
}

// inherit from main book
class EBook extends Book {
  constructor(title, author, isbn, pubDate, genre, format) {
    super(title, author, isbn, pubDate, genre, price);
    this.format = format;
  }
}

class PrintedBook extends Book {
  constructor(title, author, isbn, pubDate, genre, dimensions) {
    super(title, author, isbn, pubDate, genre, price);
    this.dimensions = dimensions;
  }
}
