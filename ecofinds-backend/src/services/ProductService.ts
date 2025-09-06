import prisma from '../database/prisma';

export class ProductService {
  async createProduct(sellerId: number, data: any, imageUrls: string[]) {
    const created = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        condition: data.condition,
        seller: { connect: { id: sellerId } },
        categoryId: data.categoryId ?? undefined,
        images: { create: imageUrls.map(url => ({ url })) }
      },
      include: { images: true }
    });
    return created;
  }

  async getProductById(id: number) {
    return prisma.product.findUnique({ where: { id }, include: { images: true, seller: true, reviews: true }});
  }

  async listProducts(query: any) {
    const page = Number(query.page || 1);
    const pageSize = Number(query.pageSize || 10);
    const where: any = { isActive: true };
    if (query.q) {
      where.OR = [
        { title: { contains: query.q, mode: 'insensitive' } },
        { description: { contains: query.q, mode: 'insensitive' } }
      ];
    }
    if (query.categoryId) where.categoryId = Number(query.categoryId);
    if (query.minPrice || query.maxPrice) {
      where.price = {};
      if (query.minPrice) where.price.gte = Number(query.minPrice);
      if (query.maxPrice) where.price.lte = Number(query.maxPrice);
    }
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { images: true, seller: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);
    return { items, total, page, pageSize };
  }
}
