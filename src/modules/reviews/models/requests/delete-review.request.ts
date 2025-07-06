import { IsInt } from 'class-validator';

export class DeleteReviewRequest {
  @IsInt()
  reviewId: number;
}
