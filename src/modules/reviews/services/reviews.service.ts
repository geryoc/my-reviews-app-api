import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/modules/_core/entities/review.entity';
import { addAndWhere } from 'src/modules/_core/helpers/add-and-where.helper';
import { paginateQuery } from 'src/modules/_core/helpers/pagination-helper';
import { Review } from 'src/modules/_core/models/review.model';
import { Repository } from 'typeorm';
import { CreateReviewRequest } from '../models/requests/create-review.request';
import { DeleteReviewRequest } from '../models/requests/delete-review.request';
import { GetReviewRequest } from '../models/requests/get-review.request';
import { SearchReviewsRequest } from '../models/requests/search-reviews.request';
import { UpdateReviewRequest } from '../models/requests/update-review.request';
import { CreateReviewResponse } from '../models/responses/create-review.response';
import { DeleteReviewResponse } from '../models/responses/delete-review.response';
import { GetAllReviewsResponse } from '../models/responses/get-all-reviews.response';
import { GetReviewResponse } from '../models/responses/get-review.response';
import { SearchReviewsResponse } from '../models/responses/search-reviews.response';
import { UpdateReviewResponse } from '../models/responses/update-review.response';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async create(request: CreateReviewRequest): Promise<CreateReviewResponse> {
    const reviewEntity = this.reviewRepository.create(request);
    await this.reviewRepository.save(reviewEntity);
    return { review: Review.fromEntity(reviewEntity) };
  }

  async getById(request: GetReviewRequest): Promise<GetReviewResponse> {
    const reviewEntity = (await this.reviewRepository.findOne({
      where: { reviewId: request.reviewId },
      relations: ['imageMedia', 'reviewTags', 'reviewTags.tag'],
    }))!; // Non-null assertion
    if (!reviewEntity) throw new NotFoundException('Review not found');
    return { review: Review.fromEntity(reviewEntity) };
  }

  async update(
    request: UpdateReviewRequest & { reviewId: number },
  ): Promise<UpdateReviewResponse> {
    let reviewEntity = await this.reviewRepository.findOne({
      where: { reviewId: request.reviewId },
    });

    if (!reviewEntity) throw new NotFoundException('Review not found');
    Object.assign(reviewEntity, request);
    await this.reviewRepository.save(reviewEntity);

    reviewEntity = (await this.reviewRepository.findOne({
      where: { reviewId: request.reviewId },
    }))!;
    return { review: Review.fromEntity(reviewEntity) };
  }

  async delete(request: DeleteReviewRequest): Promise<DeleteReviewResponse> {
    const reviewEntity = await this.reviewRepository.findOne({
      where: { reviewId: request.reviewId },
    });
    if (!reviewEntity) throw new NotFoundException('Review not found');
    await this.reviewRepository.remove(reviewEntity);
    return { success: true };
  }

  async getAll(): Promise<GetAllReviewsResponse> {
    const reviewEntities = await this.reviewRepository.find({
      relations: ['imageMedia', 'reviewTags', 'reviewTags.tag'],
    });
    return { reviews: reviewEntities.map(Review.fromEntity) };
  }

  async search(request: SearchReviewsRequest): Promise<SearchReviewsResponse> {
    const { pageNumber, pageSize } = request;
    const queryBuilder = this.generateSearchQuery(request);
    const { items, total } = await paginateQuery(
      queryBuilder,
      pageNumber,
      pageSize,
    );
    return {
      items: items.map(Review.fromEntity),
      total,
      pageNumber,
      pageSize,
    };
  }

  private generateSearchQuery(request: SearchReviewsRequest) {
    const queryBuilder = this.reviewRepository.createQueryBuilder('review');

    addAndWhere(
      queryBuilder,
      'review.userId = :userId',
      { userId: request.userId },
      !!request.userId,
    );
    addAndWhere(
      queryBuilder,
      'review.title ILIKE :title',
      { title: `%${request.title}%` },
      !!request.title,
    );
    addAndWhere(
      queryBuilder,
      'review.categoryId = :categoryId',
      { categoryId: request.categoryId },
      !!request.categoryId,
    );
    addAndWhere(
      queryBuilder,
      'review.date >= :dateFrom',
      { dateFrom: request.dateFrom },
      !!request.dateFrom,
    );
    addAndWhere(
      queryBuilder,
      'review.date <= :dateTo',
      { dateTo: request.dateTo },
      !!request.dateTo,
    );
    addAndWhere(
      queryBuilder,
      'review.isFavorite = :isFavorite',
      { isFavorite: request.isFavorite },
      request.isFavorite !== undefined,
    );

    if (request.query) {
      queryBuilder.andWhere(
        '(review.title ILIKE :q OR review.description ILIKE :q OR review.pros::text ILIKE :q OR review.cons::text ILIKE :q)',
        { q: `%${request.query}%` },
      );
    }
    return queryBuilder;
  }
}
