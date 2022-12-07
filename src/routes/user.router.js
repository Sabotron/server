import {Router} from 'express';
const router = Router();

import{getUser, getUsers, createUser, updateUser, deleteUser} from '../controllers/user.controller.js';


router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;