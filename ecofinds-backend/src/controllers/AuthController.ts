import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const payload = req.body;
    const result = await authService.register(payload);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  }
}
