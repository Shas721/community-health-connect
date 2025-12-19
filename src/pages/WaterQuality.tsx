import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, CheckCircle, AlertTriangle, XCircle, MapPin, Wifi, 
  WifiOff, Battery, ThermometerSun, Filter, Download, RefreshCw
} from "lucide-react";

const waterSources = [
  { id: 1, name: "Tube Well #23", location: "Rampur S2", status: "unsafe", issue: "Coliform +ve", lastTest: "2 hrs ago", ph: 7.8, tds: 680, turbidity: 4.2 },
  { id: 2, name: "Hand Pump #45", location: "Rampur S4", status: "moderate", issue: "High TDS", lastTest: "5 hrs ago", ph: 7.2, tds: 520, turbidity: 1.8 },
  { id: 3, name: "Tap Water #12", location: "Sitapur N", status: "safe", issue: null, lastTest: "1 hr ago", ph: 7.0, tds: 280, turbidity: 0.9 },
  { id: 4, name: "Pond #8", location: "Misrikh", status: "unsafe", issue: "E.coli", lastTest: "6 hrs ago", ph: 8.1, tds: 750, turbidity: 5.5 },
  { id: 5, name: "Tube Well #31", location: "Laharpur", status: "safe", issue: null, lastTest: "3 hrs ago", ph: 7.1, tds: 310, turbidity: 1.1 },
  { id: 6, name: "Hand Pump #52", location: "Mahmudabad", status: "safe", issue: null, lastTest: "4 hrs ago", ph: 6.9, tds: 295, turbidity: 0.8 },
];

const sensors = [
  { id: 1, name: "Sensor #A1", location: "Rampur", status: "online", battery: 85 },
  { id: 2, name: "Sensor #A2", location: "Sitapur", status: "online", battery: 72 },
  { id: 3, name: "Sensor #A3", location: "Misrikh", status: "offline", battery: 5 },
  { id: 4, name: "Sensor #A4", location: "Laharpur", status: "online", battery: 90 },
];

const statusConfig = {
  safe: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", badge: "success" as const },
  moderate: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", badge: "warning" as const },
  unsafe: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", badge: "destructive" as const },
};

const WaterQuality = () => {
  const [activeItem, setActiveItem] = useState("water");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Water Quality Monitoring</h1>
              <p className="text-muted-foreground">245 sources monitored across the district</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="hero">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Sensors
              </Button>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Droplets className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold">245</p>
                <p className="text-sm text-muted-foreground">Total Sources</p>
              </CardContent>
            </Card>
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto text-success mb-2" />
                <p className="text-2xl font-bold text-success">178</p>
                <p className="text-sm text-muted-foreground">Safe (73%)</p>
              </CardContent>
            </Card>
            <Card className="bg-warning/10 border-warning/20">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto text-warning mb-2" />
                <p className="text-2xl font-bold text-warning">45</p>
                <p className="text-sm text-muted-foreground">Moderate (18%)</p>
              </CardContent>
            </Card>
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-4 text-center">
                <XCircle className="w-8 h-8 mx-auto text-destructive mb-2" />
                <p className="text-2xl font-bold text-destructive">22</p>
                <p className="text-sm text-muted-foreground">Unsafe (9%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Wifi className="w-8 h-8 mx-auto text-info mb-2" />
                <p className="text-2xl font-bold">38/45</p>
                <p className="text-sm text-muted-foreground">Sensors Online</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Water Sources List */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {waterSources.map((source) => {
                    const config = statusConfig[source.status as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <div key={source.id} className={`p-4 rounded-lg ${config.bg} border border-border`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${config.color}`} />
                            <div>
                              <p className="font-medium">{source.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {source.location}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={config.badge} className="capitalize mb-1">
                              {source.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">{source.lastTest}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">pH Level</p>
                            <p className="font-medium">{source.ph}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">TDS (ppm)</p>
                            <p className="font-medium">{source.tds}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Turbidity</p>
                            <p className="font-medium">{source.turbidity} NTU</p>
                          </div>
                        </div>
                        {source.issue && (
                          <p className="text-sm text-destructive mt-2 font-medium">⚠️ Issue: {source.issue}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Parameter Thresholds */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Parameter Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>pH Level</span>
                      <span className="text-success">6.5 - 8.5</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>TDS (ppm)</span>
                      <span className="text-warning">&lt;500</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Turbidity (NTU)</span>
                      <span className="text-success">&lt;5</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Chlorine (mg/L)</span>
                      <span className="text-success">0.2 - 1.0</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* IoT Sensors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wifi className="w-4 h-4" />
                    IoT Sensors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sensors.map((sensor) => (
                    <div key={sensor.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        {sensor.status === "online" ? (
                          <Wifi className="w-4 h-4 text-success" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-destructive" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{sensor.name}</p>
                          <p className="text-xs text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Battery className={`w-3 h-3 ${sensor.battery < 20 ? 'text-destructive' : 'text-success'}`} />
                        {sensor.battery}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WaterQuality;
