import { NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}

// Estendendo a interface de definição de tipo do Express Request
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const autenticar: RequestHandler = (req, res, next) => {
  //console.log(req.headers);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Sem Token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = `${process.env.JWT_SECRET }`
  try {
    //Usar variaves do token em outras funções //fica parecendo um erro, mas funciona
    const decoded = jwt.verify(token, secret) as DecodedToken;
    
    const { id, email, name } = decoded;
    req.user = { id, email, name };
    
    next();
  } catch (error) {
    res.status(401).json({ error: "Sem autorização" });
  }
};

export default autenticar;