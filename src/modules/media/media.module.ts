import { Module } from '@nestjs/common';
import { CoreModule } from '../_core/core.module';
import { MediaController } from './controllers/media.controller';
import { MediaService } from './services/media.service';

@Module({
  imports: [CoreModule],
  exports: [],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
