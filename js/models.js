export class Book {
    constructor(title, author, isbn, pubDate, genre, price) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.pubDate = pubDate;
        this.genre = genre;
        this.price = price;
    }
    getDiscount(discountRate) {
        return (this.price - this.price * (discountRate / 100)).toFixed(2);
    }
    getAge() {
        const pubYear = new Date(this.pubDate).getFullYear();
        const currYear = new Date().getFullYear();
        return currYear - pubYear;
    }
}
