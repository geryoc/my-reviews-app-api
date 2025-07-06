import { SelectQueryBuilder } from 'typeorm';

/**
 * Adds an AND WHERE clause to the query builder if the condition should be applied.
 * @param queryBuilder The TypeORM SelectQueryBuilder instance
 * @param condition The SQL condition string (e.g., 'review.title ILIKE :title')
 * @param parameters The parameters object for the condition
 * @param shouldAdd If true, the condition is added
 */
export function addAndWhere<T extends import('typeorm').ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  condition: string,
  parameters?: Object,
  shouldAdd: boolean = true,
) {
  if (shouldAdd) {
    queryBuilder.andWhere(condition, parameters);
  }
}
