import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../_core/auth/jwt.guard';
import { CreateReviewRequest } from '../models/requests/create-review.request';
import { SearchReviewsRequest } from '../models/requests/search-reviews.request';
import { UpdateReviewRequest } from '../models/requests/update-review.request';
import { CreateReviewResponse } from '../models/responses/create-review.response';
import { DeleteReviewResponse } from '../models/responses/delete-review.response';
import { GetAllReviewsResponse } from '../models/responses/get-all-reviews.response';
import { GetReviewResponse } from '../models/responses/get-review.response';
import { SearchReviewsResponse } from '../models/responses/search-reviews.response';
import { UpdateReviewResponse } from '../models/responses/update-review.response';
import { ReviewsService } from '../services/reviews.service';

@ApiTags('reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, type: CreateReviewResponse })
  async create(
    @Body() req: CreateReviewRequest,
  ): Promise<CreateReviewResponse> {
    return this.reviewsService.create(req);
  }

  @Get(':reviewId')
  @ApiOperation({ summary: 'Get a review by ID' })
  @ApiResponse({ status: 200, type: GetReviewResponse })
  async getById(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<GetReviewResponse> {
    return this.reviewsService.getById({ reviewId });
  }

  @Put(':reviewId')
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, type: UpdateReviewResponse })
  async update(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() req: UpdateReviewRequest,
  ): Promise<UpdateReviewResponse> {
    return this.reviewsService.update({ reviewId, ...req });
  }

  @Delete(':reviewId')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, type: DeleteReviewResponse })
  async delete(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<DeleteReviewResponse> {
    return this.reviewsService.delete({ reviewId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, type: GetAllReviewsResponse })
  async getAll(): Promise<GetAllReviewsResponse> {
    return this.reviewsService.getAll();
  }

  @Post('search')
  @ApiOperation({ summary: 'Search reviews' })
  @ApiResponse({ status: 200, type: SearchReviewsResponse })
  async search(
    @Body() req: SearchReviewsRequest,
  ): Promise<SearchReviewsResponse> {
    return this.reviewsService.search(req);
  }
}
