import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { queryClient as staticQueryClient } from "./lib/staticQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Use static query client for production builds (Netlify deployment)
  const isProduction = import.meta.env.PROD;
  const client = isProduction ? staticQueryClient : queryClient;
  
  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
