import { Response } from 'express';
import { OrderService } from '../services/OrderService';
import { AuthRequest } from '../middlewares/auth';

const svc = new OrderService();

export class OrderController {
  async create(req: AuthRequest, res: Response) {
    const { items } = req.body;
    const order = await svc.createOrder(req.user!.id, items);
    res.status(201).json(order);
  }

  async list(req: AuthRequest, res: Response) {
    const orders = await svc.listOrders(req.user!.id);
    res.json(orders);
  }
}
