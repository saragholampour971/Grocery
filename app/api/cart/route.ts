import {NextResponse} from "next/server";
import {getCurrentUser} from "@/lib/serverAuth";
import {adminDb} from "@/lib/firebaseAdmin";
import {CartResponse, ICartItem} from "./type";
import {FieldPath} from "firebase-admin/firestore";

export async function GET(req: Request): Promise<NextResponse<CartResponse>> {

  // گرفتن کاربر جاری
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }
  console.log("user", user);

  const userRef = adminDb.collection("users").doc(user.uid);
  const userSnapshot = await userRef.get();

  // اگر کاربر وجود نداشت، بساز
  if (!userSnapshot.exists) {
    await userRef.set({
      cart: [], // یا هر فیلد اولیه که میخوای
    });
  }

  // گرفتن cart
  const cartSnapshot = await userRef.collection("cart").get();

  if (cartSnapshot.empty) return NextResponse.json({data: []});

  const productIds = cartSnapshot.docs.map((doc) => doc.id);

  // batch fetch محصولات
  const productsSnap = await adminDb
    .collection("products")
    .where(FieldPath.documentId(), "in", productIds)
    .get();

  const productsMap = new Map(
    productsSnap.docs.map((doc) => [doc.id, doc.data()])
  );

  const cart: ICartItem[] = cartSnapshot.docs.map((doc) => {
    const productData = productsMap.get(doc.id) || {};
    return {
      productId: doc.id,
      quantity: +doc.data().quantity,
      name: productData.name,
      price: +productData.price,
      imageUrl: productData.imageUrl,
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


  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }


  const {productId, quantity} = await req.json();


  const cartRef = adminDb
    .collection("users")
    .doc(user.uid)
    .collection("cart")
    .doc(productId);

  const cartDoc = await cartRef.get();

  if (cartDoc.exists) {
    const currentQuantity = cartDoc.data()?.quantity || 0;
    await cartRef.update({
      quantity: currentQuantity + 1,
    });
    console.log(`✅ Updated quantity for ${productId} to ${currentQuantity + 1}`);
  } else {
    await cartRef.set({
      productId,
      quantity: 1,
    });
    console.log(`🆕 Added ${productId} to cart`);
  }
  return NextResponse.json({success: true});

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
