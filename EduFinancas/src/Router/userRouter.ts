import { Request, Response } from 'express';
import { UserController } from '../Controller/userController';
import express from "express";

const userController = new UserController();
const routerUser = express.Router();
routerUser.use(express.json());

routerUser.get("/user/:userId", userController.getUserById.bind(userController))
routerUser.post("/user", userController.createUser.bind(userController));
routerUser.delete("/user/userId", userController.deleteUser.bind(userController))
routerUser.put("/user/:userId", userController.updateUser.bind(userController))

export default routerUser;