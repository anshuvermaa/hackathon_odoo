import { Response, Request } from 'express';
import { ReviewService } from '../services/ReviewService';
import { AuthRequest } from '../middlewares/auth';

const svc = new ReviewService();

export class ReviewController {
  async create(req: AuthRequest, res: Response) {
    const { productId, rating, comment } = req.body;
    const review = await svc.createReview(req.user!.id, { productId, rating, comment });
    res.status(201).json(review);
  }

  async list(req: Request, res: Response) {
    const productId = Number(req.params.productId);
    const reviews = await svc.listReviews(productId);
    res.json(reviews);
  }
}
