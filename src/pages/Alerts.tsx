import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, Bell, CheckCircle, Clock, Filter, Plus, Search,
  Send, X, ArrowRight, Eye
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Outbreak Alert - Rampur Block",
    message: "47 diarrhea cases detected in Sector 2, 3, 4. Immediate response required.",
    time: "2 hours ago",
    severity: "critical",
    status: "active",
    acknowledged: "189/234",
    channels: ["push", "sms", "email"]
  },
  {
    id: 2,
    title: "Water Contamination - Tube Well #23",
    message: "Coliform positive test result. Source marked unsafe.",
    time: "5 hours ago",
    severity: "high",
    status: "active",
    acknowledged: "38/45",
    channels: ["push", "sms"]
  },
  {
    id: 3,
    title: "Fever Cluster - Misrikh",
    message: "12 fever cases reported in concentrated area.",
    time: "1 day ago",
    severity: "medium",
    status: "resolved",
    acknowledged: "56/56",
    channels: ["push"]
  },
  {
    id: 4,
    title: "AI Prediction - Sitapur North",
    message: "52% outbreak probability in next 7 days.",
    time: "2 days ago",
    severity: "low",
    status: "monitoring",
    acknowledged: "120/156",
    channels: ["email"]
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
              <p className="text-muted-foreground">Monitor and manage health alerts</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>

          {/* Stats */}
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
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Resolved (30d)</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.4k</p>
                  <p className="text-sm text-muted-foreground">Notifications Sent</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
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

          {/* Alerts List */}
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
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {alert.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bell className="w-4 h-4" />
                            {alert.acknowledged} acknowledged
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
