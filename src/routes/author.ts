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

router.get('/', (req, res) => {
  try {
    const {
      name,
      email,
      search,
      sortBy,
      sortOrder = 'asc',
      page = 1,
      limit = 10
    } = req.query;


    const queryParams: AuthorServices.AuthorQueryParams = {
      name: name as string,
      surname: email as string,
      search: search as string,
      sortBy: sortBy as string,
      sortOrder: sortOrder as 'asc' | 'desc',
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    };

    const result = AuthorServices.queryAuthor(queryParams);

if(result)
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        pages: Math.ceil(result.total / result.limit),
        hasNext: result.page * result.limit < result.total,
        hasPrev: result.page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


export default router;
