'use client'

import { Button, Heading, Tooltip, TooltipProvider } from '@medusajs/ui'

import CartTotals from '@modules/common/components/cart-totals'
import Divider from '@modules/common/components/divider'
import DiscountCode from '@modules/checkout/components/discount-code'
import LocalizedClientLink from '@modules/common/components/localized-client-link'
import { HttpTypes } from '@medusajs/types'

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
  customer?: HttpTypes.StoreCustomer | null
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return 'address'
  } else if (cart?.shipping_methods?.length === 0) {
    return 'delivery'
  } else {
    return 'payment'
  }
}

const Summary = ({ cart, customer }: SummaryProps) => {
  const step = getCheckoutStep(cart)
  const isLoggedIn = !!customer

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      {isLoggedIn ? (
        <LocalizedClientLink
          href={'/checkout?step=' + step}
          data-testid="checkout-button"
        >
          <Button className="w-full h-10">Go to checkout</Button>
        </LocalizedClientLink>
      ) : (
        <TooltipProvider>
          <Tooltip content="Please login first to complete your order">
            <div className="w-full">
              <Button className="w-full h-10" disabled={!isLoggedIn}>
                Go to checkout
              </Button>
            </div>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export default Summary
