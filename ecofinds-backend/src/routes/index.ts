import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import favoriteRoutes from './favorites';
import reviewRoutes from './reviews';
import orderRoutes from './orders';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/reviews', reviewRoutes);
router.use('/orders', orderRoutes);

export default router;
