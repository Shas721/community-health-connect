import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertBanner } from "@/components/dashboard/AlertBanner";
import { DiseaseTrendChart } from "@/components/dashboard/DiseaseTrendChart";
import { AIPredictionCard } from "@/components/dashboard/AIPredictionCard";
import { WaterQualityCard } from "@/components/dashboard/WaterQualityCard";
import { MapCard } from "@/components/dashboard/MapCard";
import { ASHAPerformance } from "@/components/dashboard/ASHAPerformance";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { 
  ClipboardList, 
  AlertCircle, 
  Droplets, 
  Users,
  Calendar,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6 space-y-6">
          {/* Page Title & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold">Health Surveillance Dashboard</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                District: Sitapur | Period: Last 7 Days
                <Badge variant="outline" className="ml-2">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                Download Report
              </Button>
              <Button variant="hero">
                Initiate Response
              </Button>
            </div>
          </div>

          {/* Alert Banner */}
          <AlertBanner
            severity="critical"
            title="Active Outbreak Alert"
            message="Acute Diarrheal Disease outbreak detected in Rampur Block - 47 cases in last 48 hours"
            onAction={() => console.log("View details")}
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Surveys"
              value="2,456"
              change={12}
              changeLabel="vs last week"
              icon={ClipboardList}
              variant="primary"
            />
            <StatCard
              title="Active Cases"
              value="127"
              change={23}
              changeLabel="Requires attention"
              icon={AlertCircle}
              variant="danger"
            />
            <StatCard
              title="Water Sources Tested"
              value="89"
              change={8}
              changeLabel="This week"
              icon={Droplets}
              variant="success"
            />
            <StatCard
              title="ASHA Workers Active"
              value="156"
              change={-2}
              changeLabel="Online now: 143"
              icon={Users}
              variant="warning"
            />
          </div>

          {/* Charts & Map Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DiseaseTrendChart />
            <AIPredictionCard />
          </div>

          {/* Map & Water Quality Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MapCard />
            <WaterQualityCard />
          </div>

          {/* ASHA & Alerts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ASHAPerformance />
            <RecentAlerts />
          </div>

          {/* Footer */}
          <footer className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Ministry of Health & Family Welfare | Government of India</p>
            <p className="mt-1">Powered by AI | Swasthya Rakshak v2.0</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
