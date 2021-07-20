import express from 'express';

import {getAllCompanies, getOneCompany, createCompany, updateCompany, deleteCompany, likeCompany} from '../controllers/company.js'
import { protect } from '../controllers/auth.js'

const router = express.Router();


router.get('/', getAllCompanies);
router.get('/:id', getOneCompany);
router.post('/', createCompany);
router.patch('/:id/likeCompany', protect, likeCompany);
router.patch('/:id', updateCompany);
router.delete('/:id', deleteCompany)

export default router;