import { ReviewsModule } from 'src/modules/reviews/reviews.module';
import { MediaModule } from './../../media/media.module';
import { UsersModule } from './../../users/users.module';

export const featureModules = [MediaModule, UsersModule, ReviewsModule];
