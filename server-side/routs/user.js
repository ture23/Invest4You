import express from 'express';

import {getAllUsers, updateUser, deleteUser, getUser, getMe, updateMe, deleteMe} from '../controllers/user.js'
import {restrictTo, protect, signup, login, forgotPassword, resetPassword, updatePassword } from '../controllers/auth.js'

const router = express.Router();

router.post('/login', login); // singin
router.post('/signup', signup);


router.use(protect);

router.patch('/resetPassword/:token', resetPassword);
router.post('/forgotPassword', forgotPassword);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);



router.use(restrictTo('63866d9792611334e84278e0', '108722639130406316566'));

router.get('/all',  getAllUsers);
router.get('/:id', getUser)
// router.post('/', createUser);
router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser)

export default router;