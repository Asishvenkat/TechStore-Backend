import { Router, Request, Response } from 'express';
import { products } from '../data/products';
import { CheckoutRequest } from '../models/types';

const router = Router();

router.post('/', (req: Request<{}, {}, CheckoutRequest>, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid cart data'
    });
  }

  try {
    let totalAmount = 0;
    const orderDetails = items.map(item => {
      const product = products.find(p => p.id === item.id);
      if (!product) {
        throw new Error(`Product with id ${item.id} not found`);
      }
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      return {
        productId: item.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: itemTotal
      };
    });

    console.log('='.repeat(50));
    console.log('NEW ORDER RECEIVED');
    console.log('='.repeat(50));
    console.log('Order Time:', new Date().toISOString());
    console.log('Items:');
    orderDetails.forEach(item => {
      console.log(`  - ${item.productName} x${item.quantity} @ $${item.unitPrice} = $${item.totalPrice.toFixed(2)}`);
    });
    console.log('-'.repeat(50));
    console.log(`Total Amount: $${totalAmount.toFixed(2)}`);
    console.log(`Total Items: ${items.reduce((sum, item) => sum + item.quantity, 0)}`);
    console.log('='.repeat(50));

    res.json({
      success: true,
      message: 'Order placed successfully',
      orderId: `ORD-${Date.now()}`,
      totalAmount: totalAmount.toFixed(2),
      orderDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
});

export default router;