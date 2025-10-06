export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CheckoutRequest {
  items: CartItem[];
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  orderId: string;
  totalAmount: string;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}