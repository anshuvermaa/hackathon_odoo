import { NextFunction, Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
import { OrderController } from '../controllers/OrderController';
import { createOrderSchema } from '../validators/order';
import { z, ZodError } from 'zod';

const router = Router();
const ctrl = new OrderController();

function validate(schema: z.ZodSchema<any>) {
  return (req:Request, res:Response, next:NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
              if (err instanceof ZodError) {
                return res.status(400).json({ errors: z.treeifyError(err) });
              }
              return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

router.post('/', auth, validate(createOrderSchema), (req, res) => ctrl.create(req, res));
router.get('/', auth, (req, res) => ctrl.list(req, res));

export default router;
