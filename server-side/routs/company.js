import express from 'express';

import {getAllCompanies, getOneCompany, createCompany, updateCompany, deleteCompany, likeCompany} from '../controllers/company.js'
import { protect } from '../controllers/auth.js'
import { createNews, getAllNews } from '../controllers/newsController.js';

const router = express.Router();


router.get('/', getAllCompanies);
router.get('/ir', getAllNews);
router.get('/:id', getOneCompany);
router.post('/', createCompany);
router.patch('/:id/likeCompany', protect, likeCompany);
router.patch('/:id', updateCompany);
router.delete('/:id', deleteCompany)
///////////////////////////////////////////////////

router.post('/ir', createNews);

export default router;