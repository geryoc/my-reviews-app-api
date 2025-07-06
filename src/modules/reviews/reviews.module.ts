import { Module } from '@nestjs/common';
import { CoreModule } from '../_core/core.module';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';

@Module({
  imports: [CoreModule],
  exports: [],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
