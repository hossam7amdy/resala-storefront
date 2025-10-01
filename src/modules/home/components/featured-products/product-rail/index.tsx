import { listProducts } from '@lib/data/products'
import { HttpTypes } from '@medusajs/types'
import { Text } from '@medusajs/ui'

import ProductPreview from '@modules/products/components/product-preview'
import { Suspense } from 'react'
import ViewAllButton from './view-all-btn'

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: '*variants.calculated_price',
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{collection.title}</Text>
        <ViewAllButton handle={collection.handle} />
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <Suspense fallback={<></>}>
                <ProductPreview product={product} region={region} isFeatured />
              </Suspense>
            </li>
          ))}
      </ul>
    </div>
  )
}
