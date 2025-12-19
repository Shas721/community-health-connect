import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, Bell, CheckCircle, Clock, Plus, Search, Send, Eye, Brain
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Outbreak Alert - Avalahalli",
    message: "23 diarrhea cases detected. AI predicts 78% risk of further spread.",
    time: "2 hours ago",
    severity: "critical",
    status: "active",
    acknowledged: "4/6",
    channels: ["push", "sms"],
    source: "AI Predicted"
  },
  {
    id: 2,
    title: "Water Contamination - Nagenahalli",
    message: "Tube Well #5 tested positive for contamination.",
    time: "5 hours ago",
    severity: "high",
    status: "active",
    acknowledged: "3/6",
    channels: ["push", "sms"],
    source: "ASHA Report"
  },
  {
    id: 3,
    title: "AI Prediction - Dengue Risk",
    message: "58% dengue outbreak probability in Nagenahalli & Singhanayakanahalli.",
    time: "1 day ago",
    severity: "medium",
    status: "monitoring",
    acknowledged: "6/6",
    channels: ["push"],
    source: "AI Predicted"
  },
  {
    id: 4,
    title: "Fever Cluster - Singhanayakanahalli",
    message: "8 fever cases reported. AI model tracking for patterns.",
    time: "2 days ago",
    severity: "low",
    status: "resolved",
    acknowledged: "6/6",
    channels: ["email"],
    source: "AI Predicted"
  },
];

const severityConfig = {
  critical: { color: "bg-destructive", text: "Critical", badge: "destructive" as const },
  high: { color: "bg-warning", text: "High", badge: "warning" as const },
  medium: { color: "bg-info", text: "Medium", badge: "info" as const },
  low: { color: "bg-success", text: "Low", badge: "success" as const },
};

const statusConfig = {
  active: { color: "text-destructive", bg: "bg-destructive/10" },
  resolved: { color: "text-success", bg: "bg-success/10" },
  monitoring: { color: "text-warning", bg: "bg-warning/10" },
};

const Alerts = () => {
  const [activeItem, setActiveItem] = useState("alerts");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Alert Management</h1>
              <p className="text-muted-foreground">Monitor health alerts including AI predictions - Yelahanka PHC</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">AI Predicted</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Monitoring</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Resolved (30d)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search alerts..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {["all", "active", "monitoring", "resolved"].map((status) => (
                  <Button
                    key={status}
                    variant={filterStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterStatus(status)}
                    className="capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const severity = severityConfig[alert.severity as keyof typeof severityConfig];
              const status = statusConfig[alert.status as keyof typeof statusConfig];
              return (
                <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${severity.color} ${alert.status === 'active' ? 'animate-pulse' : ''}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge variant={severity.badge}>{severity.text}</Badge>
                          <Badge variant="outline" className={`${status.bg} ${status.color} border-0`}>
                            {alert.status}
                          </Badge>
                          {alert.source === "AI Predicted" && (
                            <Badge variant="info" className="gap-1">
                              <Brain className="w-3 h-3" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {alert.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bell className="w-4 h-4" />
                            {alert.acknowledged} ASHA acknowledged
                          </span>
                          <div className="flex items-center gap-2">
                            {alert.channels.map((ch) => (
                              <Badge key={ch} variant="secondary" className="text-xs capitalize">
                                {ch}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        {alert.status === "active" && (
                          <Button variant="success" size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Alerts;