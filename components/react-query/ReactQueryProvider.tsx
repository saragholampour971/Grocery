"use client";
import {ReactNode, useState} from "react";
import {DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {usePathname, useRouter} from "next/navigation";

interface Props {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export default function ReactQueryProvider({children, dehydratedState}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: false,
      },

      mutations: {
        retry: false,
        onMutate: variables => {
          console.log(variables, 'variables');
        },

        onError: (error) => {
          console.log('error from react query', error);
          console.log('pathname', pathname);
          if (error.message == 'Unauthorized')
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
          else {
            console.error(error.message, error)
          }

        },

      }
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {!!dehydratedState && <HydrationBoundary state={dehydratedState}/>}
      {children}
    </QueryClientProvider>
  );
}

// // ReactQueryProvider.tsx
// "use client";
//
// import {PropsWithChildren, useState} from "react";
// import {DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider,} from "@tanstack/react-query";
//
// export default function ReactQueryProvider({
//                                              children,
//                                              dehydratedState,
//                                            }: PropsWithChildren<{ dehydratedState?: DehydratedState }>) {
//   const [queryClient] = useState(() => {
//     return new QueryClient({
//       // defaultOptions: {
//       //   mutations: {
//       //     onError: (error: Error) => {
//       //       console.log(error, '?<><><', error.name, error.message, error.cause);
//       //     },
//       //
//       //   },
//       //   queries: {
//       //     staleTime: 60 * 1000,
//       //     retry: false, // برای جلوگیری از retry خودکار روی 401
//       //
//       //   },
//       // },
//     });
//   });
//
//
//   return (
//     <QueryClientProvider client={queryClient}>
//       <HydrationBoundary state={dehydratedState}>
//         {children}
//       </HydrationBoundary>
//     </QueryClientProvider>
//   );
// }
