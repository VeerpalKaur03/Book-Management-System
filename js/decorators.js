export function LogMethod(target, // class in which method lives
key, // method itself being decorated
descriptor // lets us change the behavious of our method
) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        let title = "Unknown";
        // for edit book adnd delete book
        if ((key === "editBook" || key === "deleteBook") && args.length > 0) { //the method get at least one argument
            const index = args[0];
            if (this.books && this.books[index]) { //makes sure this.books exists and the book at that index existss
                title = this.books[index].title;
            }
        }
        // f method is saveBooks, get last book in list
        if (key === "saveBooks" && this.books && this.books.length > 0) {
            title = this.books[this.books.length - 1].title; //grab the last book
        }
        // Print message
        console.log(`${title} book has been ${key} with the args:`, args);
        // Call the original method
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
