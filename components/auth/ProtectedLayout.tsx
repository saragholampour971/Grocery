// // ProtectedLayout.tsx
// import {ReactNode} from "react";
// import type {DehydratedState} from "@tanstack/react-query";
// import {dehydrate, QueryClient} from "@tanstack/react-query";
// import {headers} from "next/headers";
// import {prefillUser} from "@/lib/serverAuth";
// import ReactQueryProvider from "../react-query/ReactQueryProvider";
// import {redirect} from "next/navigation";
//
// interface Props {
//   children: ReactNode;
// }
//
// export default async function ProtectedLayout({children}: Props) {
//   const headersList = headers();
//   const pathname = headersList.get('x-pathname') || '';
//
//   const protectedPaths = ["/cart"];
//   const isProtected = protectedPaths.some(path => pathname.startsWith(path));
//
//   if (!isProtected) {
//     const queryClient = new QueryClient({
//       defaultOptions: {
//         mutations: {
//           onError: (error: Error) => {
//             console.error(error, 'sara');
//           },
//           onMutate: async (variables) => {
//             console.error(variables, 'sara2');
//           }
//
//         }
//       }
//     });
//     return (
//       <ProtectedLayout>
//         {children}
//       </ProtectedLayout>
//     );
//   }
//
//   // Protected route logic
//   const queryClient = new QueryClient(
//     {
//       defaultOptions: {
//         mutations: {
//           onError: (error: Error) => {
//             console.error(error, 'sara');
//           },
//           onMutate: async (variables) => {
//             console.error(variables, 'sara2');
//           }
//
//         }
//       }
//     }
//   );
//
//   try {
//     console.log("🔍 Prefilling user for protected route:", pathname);
//     await prefillUser(queryClient);
//     console.log("✅ User prefilling successful");
//   } catch (error) {
//     console.error("❌ Auth failed in ProtectedLayout:", error);
//     redirect("/login");
//   }
//
//   const dehydratedState: DehydratedState = dehydrate(queryClient);
//
//   return (
//     <ReactQueryProvider dehydratedState={dehydratedState}>
//       {children}
//     </ReactQueryProvider>
//   );
// }
