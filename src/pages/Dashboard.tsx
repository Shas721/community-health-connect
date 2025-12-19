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
  RefreshCw,
  Heart,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold">Health Surveillance Dashboard</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                PHC: Yelahanka | Villages: Avalahalli, Nagenahalli, Singhanayakanahalli
                <Badge variant="outline" className="ml-2">
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">Download Report</Button>
              <Button variant="hero">Initiate Response</Button>
            </div>
          </div>

          <AlertBanner
            severity="critical"
            title="Active Outbreak Alert"
            message="Diarrhea cases detected in Avalahalli - 23 cases in last 48 hours. AI predicts 78% risk of spread."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Surveys" value="456" change={12} changeLabel="vs last week" icon={ClipboardList} variant="primary" />
            <StatCard title="Active Cases" value="47" change={23} changeLabel="Requires attention" icon={AlertCircle} variant="danger" />
            <StatCard title="Water Sources Tested" value="24" change={8} changeLabel="This week" icon={Droplets} variant="success" />
            <StatCard title="ASHA Workers Active" value="6" change={0} changeLabel="Online now: 4" icon={Users} variant="warning" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DiseaseTrendChart />
            <AIPredictionCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MapCard />
            <WaterQualityCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ASHAPerformance />
            <RecentAlerts />
          </div>

          <footer className="pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-primary" />
              <Leaf className="w-3 h-3 text-primary" />
            </div>
            <p>© 2025 Ministry of Health & Family Welfare | Government of India</p>
            <p className="mt-1 italic">GramCare - Powered by ASHA, Strengthened by AI</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;