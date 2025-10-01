'use server'

import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'
import { getCacheOptions, getRequestHeaders } from './cookies'

export const retrieveCollection = async (id: string) => {
  const headers = await getRequestHeaders()

  const next = {
    ...(await getCacheOptions('collections')),
  }

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        headers,
        next,
        cache: 'force-cache',
      }
    )
    .then(({ collection }) => collection)
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const headers = await getRequestHeaders()

  const next = {
    ...(await getCacheOptions('collections')),
  }

  queryParams.limit = queryParams.limit || '100'
  queryParams.offset = queryParams.offset || '0'

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      '/store/collections',
      {
        query: queryParams,
        headers,
        next,
        cache: 'force-cache',
      }
    )
    .then(({ collections }) => ({ collections, count: collections.length }))
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  const headers = await getRequestHeaders()

  const next = {
    ...(await getCacheOptions('collections')),
  }

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: '*products' },
      headers,
      next,
      cache: 'force-cache',
    })
    .then(({ collections }) => collections[0])
}
