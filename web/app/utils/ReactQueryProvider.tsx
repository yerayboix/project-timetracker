"use client";

import { TRPCProvider } from "@/trpc/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <TRPCProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </TRPCProvider>

    );
};

export default ReactQueryProvider;