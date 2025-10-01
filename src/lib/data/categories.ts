import { sdk } from '@lib/config'
import { HttpTypes } from '@medusajs/types'
import { getCacheOptions, getRequestHeaders } from './cookies'

export const listCategories = async (query?: Record<string, any>) => {
  const headers = await getRequestHeaders()

  const next = {
    ...(await getCacheOptions('categories')),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      '/store/product-categories',
      {
        query: {
          fields:
            '*category_children, *products, *parent_category, *parent_category.parent_category',
          limit,
          ...query,
        },
        headers,
        next,
        cache: 'force-cache',
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join('/')}`
  const headers = await getRequestHeaders()

  const next = {
    ...(await getCacheOptions('categories')),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: '*category_children, *products',
          handle,
        },
        headers,
        next,
        cache: 'force-cache',
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
