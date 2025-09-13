import * as AuthorServices from "../models/Author";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  let authors = AuthorServices.getAllAuthors();
  res.status(200).json({
    success: true,
    data: authors,
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let author = AuthorServices.getAuthorById(id);
  if (!author) {
    return res.status(404).json({
      success: false,
      Message: "Author not found",
    });
  } else {
    res.status(200).json({
      success: true,
      data: author,
    });
  }
});

router.post("/", (req, res) => {
  const { name, surname, bio } = req.body;
  if (!name || !surname || !bio) {
    return res.status(404).json({
      success: false,
      message: "name,surname and bio required",
    });
  } else {
    const authorObject = {
      name: name,
      surname: surname,
      bio: bio,
    };
    const newAuthor = AuthorServices.addAuthor(authorObject);
    res.status(200).json({
      success: true,
      data: newAuthor,
    });
  }
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updates =  req.body
  if (!updates) {
    return res.status(404).json({
      "success": false,
      "message": "Author not found",
    });
  }else{
    let updatesBook = AuthorServices.updateAuthor(id,updates)
      return res.status(200).json({
        "success":true,
        "data":updatesBook
      })
  }
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const authors = AuthorServices.deleteAuthor(id);
  if (!authors) {
    res.status(404).json({
      success: false,
      message: "author not found",
    });
  } else {
    res.status(200).json({
      success: true,
      data: authors,
    });
  }
});

export default router;
