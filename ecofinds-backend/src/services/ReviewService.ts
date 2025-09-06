import prisma from '../database/prisma';

export class ReviewService {
  async createReview(userId: number, data: { productId: number; rating: number; comment?: string }) {
    return prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        userId,
        productId: data.productId
      }
    });
  }

  async listReviews(productId: number) {
    return prisma.review.findMany({
      where: { productId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }
}
