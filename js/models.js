// abstract base class
export class BaseBook {
    constructor(title, author, isbn, pubDate, genre, price) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.pubDate = pubDate;
        this.genre = genre;
        this.price = price;
    }
    // method to calculate discount
    getDiscount(discountRate) {
        return (this.price - (this.price * discountRate) / 100).toFixed(2);
    }
    //method to get age
    getAge() {
        const pubYear = new Date(this.pubDate).getFullYear();
        return new Date().getFullYear() - pubYear;
    }
}
export class Book extends BaseBook {
    describe() {
        return `${this.title} by ${this.author}`;
    }
}
// as we create this E-book class without modifying existing code bubt extending them.(OCP)
class EBook extends BaseBook {
    describe() {
        return `${this.title} (E-Book) by ${this.author}`;
    }
}
