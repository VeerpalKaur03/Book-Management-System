export interface Author {
  name: string;
  age?: number;  
  email?: string;  
}

export class Book{
    title:string
    author:Author
    isbn:string
    pubDate:string
    genre:string
    price:number

    constructor(title: string, author:Author, isbn:string, pubDate:string, genre:string, price:number){
        this.title=title;
        this.author=author
        this.isbn=isbn
        this.pubDate=pubDate
        this.genre=genre
        this.price=price
    }

    getDiscount(discountRate:number):string{
       return (this.price - this.price * (discountRate / 100)).toFixed(2)
    }

    getAge():number{
        let pubDate=new Date(this.pubDate).getFullYear()
        let curr=new Date().getFullYear()

        return curr - pubDate
    }
}