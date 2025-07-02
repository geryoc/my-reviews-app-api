import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Media } from 'src/modules/_core/models/media.model';
import { CreateMediaRequest } from '../models/requests/create-media.request';
import { GetMediaByIdRequest } from '../models/requests/get-media-by-id.request';
import { DownloadMediaResponse } from '../models/responses/download-media.response';
import { MediaService } from '../services/media.service';

@Controller('api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Upload media file' })
  @ApiBody({ type: CreateMediaRequest })
  @ApiResponse({
    status: 201,
    description: 'Media created successfully',
    type: Media,
  })
  async createMedia(@Body() request: CreateMediaRequest): Promise<Media> {
    return this.mediaService.createMedia(request);
  }

  @Get(':mediaId')
  async getMediaById(@Param() request: GetMediaByIdRequest): Promise<Media> {
    return this.mediaService.getMediaById(request);
  }

  @Get(':mediaId/download')
  async downloadMedia(
    @Param() request: GetMediaByIdRequest,
  ): Promise<DownloadMediaResponse> {
    const buffer = await this.mediaService.downloadMedia(request);
    const base64Data = buffer.toString('base64');
    const response: DownloadMediaResponse = { base64Data };
    return response;
  }
}
