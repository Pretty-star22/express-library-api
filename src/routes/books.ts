import { Book } from './../models/books';
import { Router } from 'express';
import * as BookServices from '../models/books'
import * as AuthorServices from '../models/Author'



const router = Router();

router.get('/', (req, res) => {
    let books = BookServices.getAllBooks()
    res.status(200).json({
        "success":true,
        "data":books
    })
})

router.get('/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let getBook = BookServices.getBookById(id);
    if(!getBook){
        return res.status(200).json({
            "success":false, 
            "message":"book not found"
        })
    }
    res.status(200).json({
        "success":true,
        "data":getBook
    })
})

router.get('author/:authorId/', ((req, res) => {

    let id = parseInt(req.params.authorId);
    if(!AuthorServices.authorExist(id)){
         res.status(404).json({
           success: false,
           message: "author not found",
         });
    }else{
          let getBooks = BookServices.getBooksByAuthor(id);
        res.status(200).json({
            "success":true,
            "data":getBooks
        })
    }
}))

router.post('/',((req, res) => {
    let newBook = req.body
    let addBook = BookServices.addBook(newBook)
  if(addBook.success == true){
    return res.status(200).json(addBook)
  }else{
       return res.status(404).json(addBook)
    }
}))

router.put('/:id', ((req,res) => {
    let id = parseInt(req.params.id);
    let updates = req.body;
    if(!updates){
        res.status(404).json({
            "message":"no updates"
        })
    }else{
    let book = BookServices.updatebook(id,updates);
    res.status(200).json({
        "success":true,
        "data":book
    })
    }
}))

router.delete('/:id', ((req,res) => {
    let id = parseInt(req.params.id);
    let remaining = BookServices.deleteBook(id);
    if(!remaining){
        return res.status(404).json({
            "message":"book not found"
        })
    }else{
    return res.status(200).json({
        "success":true,
        "data":remaining
    })
}
}))

export default router