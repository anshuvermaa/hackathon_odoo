import { Response } from 'express';
import { FavoriteService } from '../services/FavoriteService';
import { AuthRequest } from '../middlewares/auth';

const svc = new FavoriteService();

export class FavoriteController {
  async toggle(req: AuthRequest, res: Response) {
    const { productId } = req.body;
    const result = await svc.toggleFavorite(req.user!.id, productId);
    res.json(result);
  }

  async list(req: AuthRequest, res: Response) {
    const favorites = await svc.listFavorites(req.user!.id);
    res.json(favorites);
  }
}
