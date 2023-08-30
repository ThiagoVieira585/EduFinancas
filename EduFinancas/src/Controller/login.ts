import { Request, Response } from "express";
import User from "../Model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado." });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({ error: "Senha inválida." });
      }

      const secret = `${process.env.JWT_SECRET}`; // Ajuste na atribuição do segredo
      if (!secret) {
        return res.status(500).json({ error: "Erro interno do servidor." });
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        secret
      );

      res.status(200).json({ msg: "Usuário autenticado com sucesso.", token });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
}
