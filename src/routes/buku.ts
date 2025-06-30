import  express  from "express";
import { allBook, getBook } from "../controllers/buku";

const router = express.Router()

router.get('/buku', getBook)
router.get('/books', allBook)

export default router