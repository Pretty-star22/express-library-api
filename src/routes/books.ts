import { Book } from './../models/books';
import { Router } from 'express';
import * as BookServices from '../models/books'
import * as AuthorServices from '../models/Author'



const router = Router();

router.get('/', (req, res) => {
     const hasQueryParams = Object.keys(req.query).length > 0;
     if(!hasQueryParams){
    let books = BookServices.getAllBooks()
    res.status(200).json({
        "success":true,
        "data":books
    })
}else{
 try {
   const {
     title,
     authorId,
     genre,
     minYear,
     maxYear,
     search,
     sortBy,
     sortOrder = "asc",
     page = 1,
     limit = 10,
   } = req.query;

   const queryParams: BookServices.BookQueryParams = {
     title: title as string,
     authorId: authorId ? parseInt(authorId as string) : undefined,
     genre: genre as string,
     minYear: minYear ? parseInt(minYear as string) : undefined,
     maxYear: maxYear ? parseInt(maxYear as string) : undefined,
     search: search as string,
     sortBy: sortBy as string,
     sortOrder: sortOrder as "asc" | "desc",
     page: parseInt(page as string),
     limit: parseInt(limit as string),
   };

   const result = BookServices.queryBooks(queryParams);

   res.status(200).json({
     success: true,
     data: result.data,
     pagination: {
       page: result.page,
       limit: result.limit,
       total: result.total,
       pages: Math.ceil(result.total / result.limit),
       hasNext: result.page * result.limit < result.total,
       hasPrev: result.page > 1,
     },
   });
 } catch (error) {
   res.status(500).json({
     success: false,
     message: "Internal server error",
   });
 }
}
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