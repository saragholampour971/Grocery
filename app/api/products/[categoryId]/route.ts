import { adminDb } from '@/lib/firebaseAdmin'
import { IProduct, ProductResponse } from '../type'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { categoryId: string }
  }
): Promise<NextResponse<ProductResponse>> {
  try {
    const productsSnapshot = await adminDb
      .collection('products')
      .where('categoryId', '==', params.categoryId)
      .get()

    const products: IProduct[] = await Promise.all(
      productsSnapshot.docs.map(async (doc) => {
        const data = doc.data()

        // گرفتن category name
        const categoryDoc = await adminDb
          .collection('categories')
          .doc(data.categoryId)
          .get()

        const categoryName = categoryDoc.exists
          ? categoryDoc.data()?.title
          : null

        return {
          id: doc.id,
          imageUrl: data.imageUrl,
          title: data.title,
          price: data.price,
          categoryId: data.categoryId,
          categoryName, // اضافه شده
          description: data.description,
        }
      })
    )

    return NextResponse.json({ data: products })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
