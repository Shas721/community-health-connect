import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CitizenPortal from "./pages/CitizenPortal";
import LiveMap from "./pages/LiveMap";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import WaterQuality from "./pages/WaterQuality";
import ASHAManagement from "./pages/ASHAManagement";
import Reports from "./pages/Reports";
import AIMLCenter from "./pages/AIMLCenter";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/citizen" element={<CitizenPortal />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/water-quality" element={<WaterQuality />} />
          <Route path="/asha-management" element={<ASHAManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/ai-ml" element={<AIMLCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
