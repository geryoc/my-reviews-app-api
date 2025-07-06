import { IsDefined, IsInt } from 'class-validator';

export class GetReviewRequest {
  @IsInt()
  @IsDefined()
  reviewId: number;
}
