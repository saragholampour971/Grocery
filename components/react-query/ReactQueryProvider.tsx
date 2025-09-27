"use client";
import {ReactNode} from "react";
import {DehydratedState, HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {usePathname, useRouter} from "next/navigation";

interface Props {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

let queryClient: QueryClient;

export default function ReactQueryProvider({children, dehydratedState}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          retry: false,
        },

        mutations: {
          retry: false,
          onError: (error) => {
            if (error.message == 'Unauthorized')
              router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            else {
              console.error(error.message, error)
            }

          },

        }
      },
    })
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!!dehydratedState && <HydrationBoundary state={dehydratedState}/>}
      {children}
    </QueryClientProvider>
  );
}
