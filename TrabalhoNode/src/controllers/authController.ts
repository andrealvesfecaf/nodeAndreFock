import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  const { name, email, password} = req.body;

  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json(user);
  } catch (err: any) {
    if (err.message === 'Nome inválido' || err.message === 'Email inválido' || err.message === 'Senha inválida') { 
      res.status(400).json({ error: err.message });
    } else if (err.message === 'Email já está em uso.') {
      res.status(409).json({ error: err.message }); 
    } else {
      res.status(500).json({ error: 'Erro no servidor.' }); 
    }
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, senha} = req.body;
  console.log(senha)
  try {
    const user = await authService.loginUser(email, senha);
    res.status(200).json({ message: 'Login bem-sucedido', user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};