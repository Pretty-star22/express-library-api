import * as AuthorServices from '../models/Author'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    let authors = AuthorServices.getAllAuthors();
    res.status(200).json({
        "success":true,
        "data":authors
    }
    )
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let author = AuthorServices.getAuthorById(id);
    if(!author){
        return res.status(404).json({
            "success":false,
            "Message":"Author not found"
        }
        )
    }else{
    res.status(200).json({
        "success":true,
        "data":author
    })
}
})

router.post('/', (req, res) => {
    const {name, surname, bio} = req.body;
    if(!name || !surname || bio){
        return res.status(404).json(
           {
            "success":false,
            "message":"name,surname and bio required"
           }
        )
    }else{
    const authorObject = {
        "name":name,
        "surname":surname,
        "bio":bio
    }
    const newAuthor = AuthorServices.addAuthor(authorObject)
    res.status(200).json({
        "success":true,
        "data":newAuthor
    })
}
})

router.put('/:id', ((req, res) => {
    let id = parseInt(req.params.id)
     const updates = req.body;
     if(!updates.name || !updates.surname || !updates.bio){
        return res.status(404).json({
            "success":false,
            "data":"update either name,surname or bio"
        })
     }else{
    let authorUpdated = AuthorServices.updateAuthor(id, updates )
    res.status(200).json({
        "success":true,
        "data":authorUpdated
    })
     }
}))

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const authors = AuthorServices.deleteAuthor(id)
    if(!authors){
        res.status(404).json(
            {
                "success":false,
                "message":"author not found"
            }
        )
    }else{
        res.status(200).json({
            "success":true,
            "data":authors
        })
    }
})