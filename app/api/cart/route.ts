import {NextResponse} from "next/server";
import {getCurrentUser} from "@/lib/serverAuth";
import {adminDb} from "@/lib/firebaseAdmin";
import {CartResponse, ICartItem} from "./type";
import {FieldPath} from "firebase-admin/firestore";

export async function GET(): Promise<NextResponse<CartResponse>> {

  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({error: "Unauthorized"}, {status: 401});


  // گرفتن cart
  const cartSnapshot = await adminDb
    .collection("users")
    .doc(user?.uid)
    .collection("cart")
    .get();

  if (cartSnapshot.empty) return NextResponse.json({data: []});

  const productIds = cartSnapshot.docs.map(doc => doc.id);

  // batch fetch محصولات
  const productsSnap = await adminDb
    .collection("products")
    .where(FieldPath.documentId(), "in", productIds)
    .get();

  const productsMap = new Map(
    productsSnap.docs.map(doc => [doc.id, doc.data()])
  );

  const cart: ICartItem[] = cartSnapshot.docs.map(doc => {
    const productData = productsMap.get(doc.id) || {};
    return {
      productId: doc.id,
      quantity: +doc.data().quantity,
      name: productData.name,
      price: +productData.price,
      imageUrl: productData.image,
      id: doc.id,
      categoryId: productData.categoryId,
      categoryName: productData.categoryName,
      title: productData.title,
      description: productData.description,
    };
  });

  return NextResponse.json({data: cart});
}

export async function POST(req: Request) {

  try {

    const user = await getCurrentUser();
    console.log('user is', user)
    if (!user) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }


    const {productId, quantity} = await req.json();

    const docRef = adminDb
      .collection("users")
      .doc("user?.uid")
      .collection("cart")
      .doc(productId);

    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const current = docSnap.data()!.quantity;
      await docRef.set({quantity: current + quantity}, {merge: true});
    } else {
      await docRef.set({quantity});
    }

    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: "Failed to add product to cart"}, {status: 500});
  }
}


export async function DELETE(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  const {productId} = await req.json();
  await adminDb
    .collection("users")
    .doc(user.uid)
    .collection("cart")
    .doc(productId)
    .delete();

  return NextResponse.json({success: true});
}
