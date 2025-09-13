

export interface Book {
    title:string,
    author:string,
    year:number,
    genre:string, 
    id:number,
    authorId:number
}

export const validateBook = ((book:Partial<Book>)=> {
    const errors = []
    
    if(!book.title || book.title.trim().length === 0){
       errors.push('Title is required')
    }
     if (!book.author || book.author.trim().length === 0) {
       errors.push("author is required");
     }
      if (!book.genre || book.genre.trim().length === 0) {
        errors.push("genre is required");
      }
    
    if(!book.authorId || book.authorId<=0){
        errors.push("authorId is required")
    }

    return errors
   
})



let books:Book[] = [
    {title:"big magic", author:"", year: 2000 , genre:"self-help", id:1, authorId:1},
    {title:"kind", author:"", year: 2020 , genre:"self-help", id:2, authorId:2},
]
let nextBookId = 3;

export const getAllBooks= (() => {return books});
export const getBookById = ((id:number) => books.find(book => book.id == id));
export const getBooksByAuthor =((authorId:number) => books.filter((book) => book.authorId === authorId));
export const addBook = ((book:Omit<Book, 'id'>) => {
    const errors = validateBook(book)
    if(errors.length == 0){
  const newBook = { ...book, id: nextBookId++ };
  books.push(newBook);
  return {"success":true, "data":books}
    }else{
    
        return {"success":false, "message":errors}
    }
  
});
export const updatebook = ((id:number, updates:Partial<Book>) => {
    let i = books.findIndex(book => book.id == id);
    if( i == -1){
        return {"massage":"book not found"}
    }else{
let updatedBook = {...books[i], ...updates}
books[i] = updatedBook;
return updatedBook
    }
})



export const deleteBook = ((id:number):Book[] => {
    books =books.filter((obj => obj.id !== id))
    return books
}) 
  