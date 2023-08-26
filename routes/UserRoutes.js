import express from 'express';
import {
    UserLogin,
    UserAuth
} from '../controllers/AuthController.js'

import { verifyToken } from '../middlewares/authVerify.js';

import { addBook,getAllBook ,getUserBook,ViewBook,AddtoCart,getUserCart} from '../controllers/BookController.js';

const router = express.Router();

router.post('/signup',UserAuth);
router.post('/login',UserLogin)

router.get('/getBooks',getAllBook)
router.get('/ViewBooks',verifyToken,ViewBook)
router.get('/myBooks',verifyToken,getUserBook)
router.get('/getCart',verifyToken,getUserCart)

router.post('/add-book',verifyToken,addBook)
router.post('/addtoCart',verifyToken,AddtoCart)





export default router;