import request from 'supertest';
import { app } from '../src/server'; // make sure server.ts exports the Express app

describe('E-Commerce API Tests', () => {
  // 🟩 Test: Get all products
  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/api/products').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return products with correct structure', async () => {
      const response = await request(app).get('/api/products').expect(200);

      const product = response.body.data[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('imageUrl');
      expect(product).toHaveProperty('description');
    });
  });

  // 🟦 Test: Checkout flow
  describe('POST /api/checkout', () => {
    it('should successfully process a valid checkout', async () => {
      const cartData = {
        items: [
          { id: 1, quantity: 2 },
          { id: 2, quantity: 1 },
        ],
      };

      const response = await request(app).post('/api/checkout').send(cartData).expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Order placed successfully');
      expect(response.body.orderId).toBeDefined();
    });

    it('should return 400 for empty cart', async () => {
      const cartData = { items: [] };

      const response = await request(app).post('/api/checkout').send(cartData).expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  // 🟨 Test: Health check endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body.status).toBe('OK');
    });
  });
});
