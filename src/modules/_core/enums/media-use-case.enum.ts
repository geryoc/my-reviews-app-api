import { EntityType } from './entity-type.enum';

export enum MediaUseCase {
  UserProfilePicture = 'user_profile_picture',
  ReviewImage = 'review_image',
  CategoryImage = 'category_image',
}

export const mediaUseCaseEntityMap: Record<MediaUseCase, EntityType> = {
  [MediaUseCase.UserProfilePicture]: EntityType.User,
  [MediaUseCase.ReviewImage]: EntityType.Review,
  [MediaUseCase.CategoryImage]: EntityType.Category,
};

export const mediaUseCaseToEntityType = (useCase: MediaUseCase): EntityType => {
  return mediaUseCaseEntityMap[useCase];
};

export const getMediaStorageKey = (
  mediaId: string,
  extension: string,
  useCase: MediaUseCase,
): string => {
  const entityType = mediaUseCaseToEntityType(useCase);
  return `media/${entityType}/${useCase}/${mediaId}.${extension}`;
};
