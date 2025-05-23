import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';

import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.post('/', (req, res) => res.send({title: "CREATE a users"}));
userRouter.put('/:id', (req, res) => res.send({title: "UPDATE a users"}));
userRouter.delete('/:id', (req, res) => res.send({title: "DELETE a users"}));

export default userRouter;