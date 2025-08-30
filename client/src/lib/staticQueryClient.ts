import { QueryClient } from "@tanstack/react-query";

// Static query client for Netlify deployment
// Since the DEX simulator works entirely client-side, we don't need backend API calls
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async () => {
        // For static deployment, we don't make actual API calls
        // The simulation works entirely in the frontend
        return null;
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      enabled: false, // Disable queries by default for static deployment
    },
    mutations: {
      retry: false,
      mutationFn: async () => {
        // No backend mutations needed for static deployment
        return null;
      },
    },
  },
});