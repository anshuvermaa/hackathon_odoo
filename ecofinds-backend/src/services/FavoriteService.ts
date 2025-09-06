import prisma from '../database/prisma';

export class FavoriteService {
  async toggleFavorite(userId: number, productId: number) {
    const existing = await prisma.favorite.findUnique({
      where: { userId_productId: { userId, productId } }
    });

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return { message: 'Removed from favorites' };
    } else {
      await prisma.favorite.create({ data: { userId, productId } });
      return { message: 'Added to favorites' };
    }
  }

  async listFavorites(userId: number) {
    return prisma.favorite.findMany({
      where: { userId },
      include: { product: { include: { images: true } } }
    });
  }
}
