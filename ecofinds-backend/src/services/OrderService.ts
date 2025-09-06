import prisma from '../database/prisma';

export class OrderService {
  async createOrder(buyerId: number, items: { productId: number; quantity: number }[]) {
    // fetch products to calculate total
    const products = await prisma.product.findMany({
      where: { id: { in: items.map(i => i.productId) } }
    });

    let total = 0;
    const orderItems = items.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) throw { status: 404, message: `Product ${item.productId} not found` };
      total += product.price * item.quantity;
      return {
        productId: product.id,
        price: product.price,
        quantity: item.quantity
      };
    });

    return prisma.order.create({
      data: {
        buyerId,
        total,
        items: { create: orderItems }
      },
      include: { items: true }
    });
  }

  async listOrders(buyerId: number) {
    return prisma.order.findMany({
      where: { buyerId },
      include: {
        items: { include: { product: { include: { images: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
