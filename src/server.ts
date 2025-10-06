import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import checkoutRouter from './routes/checkout';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve products JSON directly if needed (optional)
app.get('/api/products-json', (req, res) => {
  const productsFile = path.join(__dirname, './data/products.json');
  try {
    const data = fs.readFileSync(productsFile, 'utf-8');
    const products = JSON.parse(data);
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to read products.json' });
  }
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err?.message ?? err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
    console.log(`📦 Raw JSON API: http://localhost:${PORT}/api/products-json`);
    console.log(`🛒 Checkout API: http://localhost:${PORT}/api/checkout`);
  });
}

export { app };
