import Header from './components/Header'
import ProductListContainer from './components/ProductListContainer'
import { Suspense } from 'react'
import CustomBody from '@/components/shared/CustomBody'
import { Metadata } from 'next'
import ProductsFallback from './loading'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params

  const categoryName = category.split('-')[0] ?? ''
  return { title: decodeURIComponent(categoryName) }
}

export default async function ProductsOfCategory(props: Props) {
  const [categoryName = '', categoryId = ''] = (
    await props.params
  ).category.split('-')

  return (
    <>
      <Header title={decodeURIComponent(categoryName)} />

      <CustomBody>
        <Suspense fallback={<ProductsFallback />}>
          <ProductListContainer categoryId={categoryId} />
        </Suspense>
      </CustomBody>
    </>
  )
}
