import { SelectQueryBuilder } from 'typeorm';

export async function paginateQuery<T extends import('typeorm').ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  pageNumber: number = 1,
  pageSize: number = 10,
): Promise<{
  items: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
}> {
  const skip = (pageNumber - 1) * pageSize;
  queryBuilder.skip(skip).take(pageSize);
  const [items, total] = await queryBuilder.getManyAndCount();
  return { items, total, pageNumber, pageSize };
}
