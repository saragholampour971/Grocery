import { adminDb } from '@/lib/firebaseAdmin'
import { IProduct, ProductResponse } from '../type'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  context: { params: Promise<{ categoryId: string }> }

): Promise<NextResponse<ProductResponse>> {
  try {
    const { categoryId } = await context.params
    const productsSnapshot = await adminDb
      .collection('products')
      .where('categoryId', '==',categoryId)
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
