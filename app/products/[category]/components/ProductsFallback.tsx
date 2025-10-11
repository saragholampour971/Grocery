import ProductCardFallback from '@/components/shared/ProductCardFallback'
import CustomBody from '@/components/shared/CustomBody'

export default function ProductsFallback() {
  return (
    <CustomBody
      className={
        'flex items-start justify-between gap-3.5 px-app-padding flex-wrap'
      }
    >
      {Array.from({ length: 6 })?.map((_, index) => (
        <ProductCardFallback key={`product-${index}`} />
      ))}
    </CustomBody>
  )
}
