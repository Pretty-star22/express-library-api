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

