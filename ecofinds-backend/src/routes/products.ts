import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { ProductController } from '../controllers/ProductController';
import auth from '../middlewares/auth';
import { createProductSchema, listQuerySchema } from '../validators/product';
import { z, ZodError } from 'zod';

const router = Router();
const ctrl = new ProductController();

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random()*1e9)}-${file.originalname}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// validate body helper
function validateBody(schema: z.ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse({ ...req.body, price: req.body.price ? Number(req.body.price) : undefined });
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json({ errors: z.treeifyError(err) });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  }

  function validateQuery(schema: z.ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = schema.parse(req.query);
        next();
      } catch (err) {
        if (err instanceof ZodError) {
          return res.status(400).json({ errors: err.format() });
        }
  
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    };
  }

// public list & get
router.get('/', validateQuery(listQuerySchema), (req, res) => ctrl.list(req, res));
router.get('/:id', (req, res) => ctrl.getOne(req, res));

// protected create
router.post('/', auth, upload.array('images', 6), validateBody(createProductSchema), (req, res) => ctrl.create(req as any, res));

export default router;
