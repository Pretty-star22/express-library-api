type Author = {
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

export const getAllAuthors = (() => {return authors});
export const getAuthorById = ((id:number) => authors.find(author => author.id == id));

export const addAuthor = ((author:Author) => {
    let newAuthor = {...author, id:nextId++}
    authors.push(newAuthor)
} )

export const updateAuthor = ((id:number, updates:Author) => {
    let authorIndex = authors.findIndex(author => {
      id === author.id
    })
   if(authorIndex === -1){
    return null
   }else{
 authors[authorIndex] = {...authors[authorIndex], ...updates} 
   }
})

export const deleteAuthor = ((id:number) => authors.filter((author) => author.id !== id));

