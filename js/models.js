// Base class
class Book {
  discountAfter500 = 7;

  constructor(title, author, isbn, pubDate, genre, price) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.pubDate = pubDate;
    this.genre = genre;
    this.price = price;
    this.type = 'Book';
  }

 // to calculate the age
  getAge() {
    return new Date().getFullYear() - new Date(this.pubDate).getFullYear();
  }
  
  // to calculate the discount
  getDiscount(discountRate) {
    return (this.price - (this.price * (discountRate / 100))).toFixed(2);
  }
 
  // how much discount is givenn
  getDiscountRate() {
    return this.price >= 500 ? this.discountAfter500 : 0;
  }

  // amount after gettting disount
  getDiscountedPrice() {
    return this.getDiscount(this.getDiscountRate());
  }
}

// Subclass for EBooks
class EBook extends Book {
  discountAfter1000 = 35;
  discountAfter500 = 20;
  discountAfter200 = 10;

  constructor(title, author, isbn, pubDate, genre, price, format) {
    super(title, author, isbn, pubDate, genre, price);
    this.format = format;
    this.type = 'EBook';
  }

  getDiscountRate() {
    if (this.price >= 1000) return this.discountAfter1000;
    if (this.price >= 500) return this.discountAfter500;
    if (this.price > 200) return this.discountAfter200;
    return 0;
  }

  getDiscountedPrice() {
    return this.getDiscount(this.getDiscountRate());
  }
}

// Subclass for Printed Books
class PrintedBook extends Book {
  discountAfter1000 = 37;
  discountAfter500 = 22;
  discountAfter200 = 12;

  constructor(title, author, isbn, pubDate, genre, price, dimensions) {
    super(title, author, isbn, pubDate, genre, price);
    this.dimensions = dimensions;
    this.type = 'PrintedBook';
  }

  getDiscountRate() {
    if (this.price >= 1000) return this.discountAfter1000;
    if (this.price >= 500) return this.discountAfter500;
    if (this.price > 200) return this.discountAfter200;
    return 0;
  }

  getDiscountedPrice() {
    return this.getDiscount(this.getDiscountRate());
  }
}
