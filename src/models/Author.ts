interface Author {
    id?:number,
    surname:string,
    name:string,
    bio:string
}



let authors:Author[] = [
  { id: 1, name: "Pretty", surname: "Mathabathe", bio: "fiction" },
  { id: 2, name: "Kanyo", surname: "Sibiya", bio: "fantasy" },
];

let nextId = 3;
export const authorExist = (id:number) => {
  let doesExist = authors.some(author => author.id === id)
  return doesExist
}

export const getAllAuthors = (() => {return authors});
export const getAuthorById = ((id:number) => authors.find(author => author.id == id));

export const addAuthor = ((author:Author) => {
    let newAuthor = {...author, id:nextId++}
    authors.push(newAuthor)
    return authors
} )

export const updateAuthor = (
  id: number,
  updates: Partial<Author>
) => {
  const index = authors.findIndex((author) => author.id === id);
  if (index === -1){
     return null
  }else{
    authors[index] = { ...authors[index], ...updates };
  return authors[index];
}
};

export const deleteAuthor = ((id:number) => authors.filter((author) => author.id !== id));


interface AuthorQueryParams {
  name?: string;
  surname?:string,
  bio?:string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export const queryAuthor = (params:AuthorQueryParams) => {
  let filteredAuthors = [...authors]

  if(params.name){
    filteredAuthors = filteredAuthors.filter(author => author.name.toLowerCase() !== params.name?.toLocaleLowerCase())
  }

  if(params.surname){
    filteredAuthors = filteredAuthors.filter(author => author.surname.toLowerCase() !== params.surname?.toLocaleLowerCase() )
  }

 if(params.search){
  const searchTerm = params.search.toLocaleLowerCase()
filteredAuthors= filteredAuthors.filter((author) => author.name.toLowerCase().includes(searchTerm) || !author.surname.toLowerCase().includes(searchTerm) || author.bio.toLowerCase().includes(searchTerm))

 }
 if (params.sortBy) {
   const sortField = params.sortBy as keyof Author;
   filteredAuthors.sort((a, b) => {
     const aValue = a[sortField] || "";
     const bValue = b[sortField] || "";

     if (aValue < bValue) return params.sortOrder === "desc" ? 1 : -1;
     if (aValue > bValue) return params.sortOrder === "desc" ? -1 : 1;
     return 0;
   });

   const total = filteredAuthors.length;
   const page = params.page || 1;
   const limit = params.limit || 10;
   const startIndex = (page - 1) * limit;
   const endIndex = startIndex + limit;

   const paginatedAuthors = filteredAuthors.slice(startIndex, endIndex);

   return {
     data: paginatedAuthors,
     total,
     page,
     limit,
   };
 }



} 