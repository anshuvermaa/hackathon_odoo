import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { registerSchema, loginSchema } from '../validators/auth';
import { z, ZodError } from 'zod';

const router = Router();
const ctrl = new AuthController();

// simple validation middleware
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

router.post('/register', validate(registerSchema), (req, res) => ctrl.register(req, res));
router.post('/login', validate(loginSchema), (req, res) => ctrl.login(req, res));

export default router;
