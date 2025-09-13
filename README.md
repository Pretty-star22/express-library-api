Bookstore API
A RESTful API built with TypeScript and Express for managing authors and books in a bookstore system.

Features
Authors Management: Full CRUD operations for authors

Books Management: Full CRUD operations for books with author relationships

Advanced Querying: Filtering, searching, sorting, and pagination

Input Validation: Comprehensive validation for all endpoints

Error Handling: Centralized error handling with proper HTTP status codes

Type Safety: Full TypeScript implementation

API Endpoints
Authors
Method	Endpoint	Description	Query Parameters
GET	/authors	Get all authors	name, surname, bio, search, sortBy, sortOrder, page, limit
GET	/authors/:id	Get author by ID	-
POST	/authors	Create new author	-
PUT	/authors/:id	Update author	-
DELETE	/authors/:id	Delete author	-
Books
Method	Endpoint	Description	Query Parameters
GET	/books	Get all books	title, authorId, genre, minYear, maxYear, search, sortBy, sortOrder, page, limit
GET	/books/:id	Get book by ID	-
GET	/books/author/:authorId	Get books by author	-
POST	/books	Create new book	-
PUT	/books/:id	Update book	-
DELETE	/books/:id	Delete book	-
Query Parameters
Filtering
Exact matches: name, surname, bio, title, authorId, genre

Range filters: minYear, maxYear (for books)

Search: search (partial matches across multiple fields)

Sorting
sortBy: Field to sort by (e.g., name, title, year)

sortOrder: asc (ascending) or desc (descending)

Pagination
page: Page number (default: 1)

limit: Items per page (default: 10)

Request/Response Examples
Get Authors with Query Parameters
bash
# Get authors sorted by name
curl "http://localhost:3000/authors?sortBy=name&sortOrder=asc"

# Search for authors
curl "http://localhost:3000/authors?search=fic"

# Paginate results
curl "http://localhost:3000/authors?page=2&limit=5"
Create a New Author
bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "surname": "Doe",
    "bio": "Fiction writer"
  }'
Create a New Book
bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Novel",
    "author": "John Doe",
    "year": 2023,
    "genre": "Fiction",
    "authorId": 1
  }'
Response Format
Success Response
json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
Error Response
json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error 1", "Validation error 2"]
}
Status Codes
200 OK - Successful request

201 Created - Resource created successfully

400 Bad Request - Validation error or invalid input

404 Not Found - Resource not found

409 Conflict - Duplicate resource

500 Internal Server Error - Server error

Installation
Clone the repository:

bash
git clone https://github.com/Pretty-star22/express-library-api
cd express-library-api
Install dependencies:

bash
npm install
Build the project:


bash
npm run dev
Development
The project structure:

text
src/
├── models/          # Data models and business logic
│   ├── Author.ts    # Author model and operations
│   └── books.ts     # Book model and operations
├── routes/          # API routes
│   ├── author.ts    # Author routes
│   └── books.ts     # Book routes
├── middleware/      # Custom middleware
├── index.ts         # Application entry point
└── package.json     # Dependencies and scripts
Technologies Used
TypeScript - Type-safe JavaScript

Express.js - Web framework

In-memory storage - Data persistence (for development)

Custom validation - Input validation middleware

Sample Data
Authors
Pretty Mathabathe (fiction)

Kanyo Sibiya (fantasy)

Books
"big magic" by Author 1 (self-help, 1998)

"go giver" by Author 2 (philosophy, 2020)

Future Enhancements
Database integration (PostgreSQL/MongoDB)

Authentication and authorization

Rate limiting

API documentation with Swagger

Docker containerization

Unit and integration tests

License
This project is for educational purposes.