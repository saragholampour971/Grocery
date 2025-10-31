import { fetchWithAuth } from './fetchWithAuth'
import { z } from 'zod/v4'
import {
  SuccessResponseSchema,
  SuccessResponseType,
} from '@grocery-repo/schemas'

export async function fetchApi<T extends z.ZodType<any>>(
  url: string,
  schema: T,
  options?: RequestInit
): Promise<SuccessResponseType<T>> {
  const rawData = await fetchWithAuth(url, options)
  return SuccessResponseSchema(schema).parse(rawData)
}
