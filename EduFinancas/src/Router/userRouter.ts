import { Request, Response } from 'express';
import { UserController } from '../Controller/userController';
import express from "express";

const userController = new UserController();
const router = express.Router();
router.use(express.json());

router.get("/user/:userId", userController.getUserById.bind(userController))
router.post("/user", userController.createUser.bind(userController));
router.delete("/user/:userId", userController.deleteUser.bind(userController))
router.put("/user/:userId", userController.updateUser.bind(userController))

export default router;