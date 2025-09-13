import { log } from "console"
import express, {Express} from "express"
import { logger } from "./Middleware/logger"
import authorRouter from './routes/author'
import bodyParser from 'body-parser'
import bookRouter from './routes/books'
import { handleError } from "./Middleware/ErrorHandler"

const app:Express = express()

const PORT =  process.env.PORT || 5000

app.use(bodyParser.json())
app.use(logger);


app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
