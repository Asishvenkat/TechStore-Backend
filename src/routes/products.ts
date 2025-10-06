import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

const productsFilePath = path.join(__dirname, '../data/products.json');

router.get('/', (req: Request, res: Response) => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(data);
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error reading products.json:', error);
    res.status(500).json({ success: false, message: 'Failed to load products' });
  }
});

export default router;
