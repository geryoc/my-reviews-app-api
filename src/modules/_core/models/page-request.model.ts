import { IsInt, Min } from 'class-validator';

export class PageRequest {
  @IsInt()
  @Min(1)
  pageNumber: number = 1;

  @IsInt()
  @Min(1)
  pageSize: number = 10;
}
