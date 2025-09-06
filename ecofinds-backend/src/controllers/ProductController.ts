import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { AuthRequest } from '../middlewares/auth';

const svc = new ProductService();

export class ProductController {
  async create(req: AuthRequest, res: Response) {
    const body = req.body;
    const files = (req as any).files || [];
    const imageUrls = files.map((f: { filename: string }) => `/uploads/${f.filename}`);
    const sellerId = req.user!.id;
    const product = await svc.createProduct(sellerId, {
      title: body.title,
      description: body.description,
      price: Number(body.price),
      condition: body.condition,
      categoryId: body.categoryId ? Number(body.categoryId) : undefined
    }, imageUrls);
    res.status(201).json(product);
  }

  async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await svc.getProductById(id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  }

  async list(req: Request, res: Response) {
    const result = await svc.listProducts(req.query);
    res.json(result);
  }
}
