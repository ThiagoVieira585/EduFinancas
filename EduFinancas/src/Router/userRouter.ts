import { UserController } from '../Controller/userController';
import express from "express";
import { LoginController } from '../Controller/login';
import autenticar from '../Middleware/token';

const userController = new UserController();
const loginController = new LoginController();
const routerUser = express.Router();
routerUser.use(express.json());

routerUser.post("/login", loginController.login.bind(loginController))
routerUser.get("/user/:userId", userController.getUserById.bind(userController))
routerUser.post("/user", userController.createUser.bind(userController));
routerUser.delete("/user/delete",autenticar, userController.deleteUser.bind(userController))
routerUser.put("/user/:userId", autenticar, userController.updateUser.bind(userController))

export default routerUser;