import { PaginationResponse } from '../../../_core/models/responses/pagination.response';
import { Review } from '../../../_core/models/review.model';

export class SearchReviewsResponse extends PaginationResponse<Review> {}
