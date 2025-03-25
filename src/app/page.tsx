"use client";

import { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "./components/ErrorBoundary";
import Products from "./components/Products";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <Products />
        </Suspense>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
