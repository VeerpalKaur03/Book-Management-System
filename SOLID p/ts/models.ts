

// IBook interface
// here LSP is applied because our child class Book can substitute our parent classes IBook and BaseBook
export interface IBook {
  title: string;
  author: string;
  isbn: string;
  pubDate: string;
  genre: string;
  price: number;

  getDiscount(discountRate: number): string;

  getAge(): number;
}


// Integration Segregation Principle
export interface Describe {
  describe(): string;

}


// abstract base class
export abstract class BaseBook implements IBook {
  constructor(
    public title: string,
    public author: string,
    public isbn: string,
    public pubDate: string,
    public genre: string,
    public price: number
  ) {}

  // method to calculate discount
  getDiscount(discountRate: number): string {
    return (this.price - (this.price * discountRate) / 100).toFixed(2);
  }

  //method to get age
  getAge(): number {
    const pubYear = new Date(this.pubDate).getFullYear();
    return new Date().getFullYear() - pubYear;
  }

}



export class Book  extends BaseBook implements Describe{
  describe(): string {
    return `${this.title} by ${this.author}`;
  }
}


// as we create this E-book class without modifying existing code bubt extending them.(OCP)
class EBook extends BaseBook implements Describe{
  describe(): string {
    return `${this.title} (E-Book) by ${this.author}`;
  }
}

