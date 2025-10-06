import { Router, Request, Response } from 'express';
import { products } from '../data/products';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: products
  });
});

export default router;