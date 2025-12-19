import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Layers, ZoomIn, ZoomOut, Locate, Filter, Download } from "lucide-react";

const hotspots = [
  { name: "Rampur", cases: 47, x: 35, y: 25, severity: "high", type: "disease" },
  { name: "Sitapur", cases: 23, x: 55, y: 40, severity: "medium", type: "disease" },
  { name: "Misrikh", cases: 18, x: 70, y: 55, severity: "medium", type: "disease" },
  { name: "Laharpur", cases: 5, x: 25, y: 65, severity: "low", type: "disease" },
  { name: "Mahmudabad", cases: 3, x: 80, y: 30, severity: "low", type: "disease" },
];

const waterSources = [
  { name: "Tube Well #23", x: 38, y: 28, status: "unsafe" },
  { name: "Hand Pump #12", x: 52, y: 45, status: "safe" },
  { name: "Pond #5", x: 72, y: 58, status: "moderate" },
  { name: "Tap Water #8", x: 28, y: 62, status: "safe" },
];

const ashaLocations = [
  { name: "Sunita Devi", x: 33, y: 27, online: true },
  { name: "Meera Yadav", x: 57, y: 42, online: true },
  { name: "Kamla Devi", x: 68, y: 52, online: false },
];

const severityColors = {
  high: "bg-destructive",
  medium: "bg-warning", 
  low: "bg-success",
};

const waterColors = {
  safe: "bg-success",
  moderate: "bg-warning",
  unsafe: "bg-destructive",
};

const LiveMap = () => {
  const [activeItem, setActiveItem] = useState("map");
  const [layers, setLayers] = useState({
    diseases: true,
    water: true,
    asha: true,
    healthCenters: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Live Surveillance Map</h1>
              <p className="text-muted-foreground">Real-time disease and water quality mapping</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Map Area */}
            <Card className="col-span-3">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-primary" />
                  District Map - Sitapur
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Locate className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-[500px] rounded-xl bg-gradient-to-br from-muted/50 to-muted overflow-hidden border border-border">
                  {/* Grid pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                  
                  {/* District outline */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path 
                      d="M20,20 Q30,10 50,15 Q70,20 80,30 Q90,50 85,70 Q75,85 50,90 Q25,85 15,70 Q10,50 20,20" 
                      fill="hsl(var(--primary) / 0.05)" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="0.3"
                    />
                  </svg>

                  {/* Disease Hotspots */}
                  {layers.diseases && hotspots.map((spot) => (
                    <div
                      key={spot.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                      <div className={`absolute w-12 h-12 rounded-full ${severityColors[spot.severity as keyof typeof severityColors]} opacity-20 animate-ping`} />
                      <div className={`relative w-8 h-8 rounded-full ${severityColors[spot.severity as keyof typeof severityColors]} flex items-center justify-center text-xs font-bold text-background shadow-lg border-2 border-background`}>
                        {spot.cases}
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-sm font-medium">{spot.name}</p>
                        <p className="text-xs text-muted-foreground">{spot.cases} active cases</p>
                      </div>
                    </div>
                  ))}

                  {/* Water Sources */}
                  {layers.water && waterSources.map((source) => (
                    <div
                      key={source.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: `${source.x}%`, top: `${source.y}%` }}
                    >
                      <div className={`w-5 h-5 rounded-sm ${waterColors[source.status as keyof typeof waterColors]} flex items-center justify-center text-xs font-bold text-background shadow border border-background rotate-45`}>
                        <span className="-rotate-45">💧</span>
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-sm font-medium">{source.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{source.status}</p>
                      </div>
                    </div>
                  ))}

                  {/* ASHA Locations */}
                  {layers.asha && ashaLocations.map((asha) => (
                    <div
                      key={asha.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: `${asha.x}%`, top: `${asha.y}%` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground shadow border-2 border-background">
                        👩‍⚕️
                      </div>
                      {asha.online && <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-success rounded-full border border-background" />}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        <p className="text-sm font-medium">{asha.name}</p>
                        <p className="text-xs text-muted-foreground">{asha.online ? "🟢 Online" : "🔴 Offline"}</p>
                      </div>
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
                    <p className="text-xs font-semibold mb-3">Map Legend</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-destructive" />
                        <span>High Risk (&gt;30 cases)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-warning" />
                        <span>Medium Risk (10-30)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-success" />
                        <span>Low Risk (&lt;10)</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex items-center gap-2">
                          <span>💧</span>
                          <span>Water Source</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>👩‍⚕️</span>
                          <span>ASHA Worker</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layer Controls */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Layer Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "diseases", label: "Disease Cases", icon: "🦠" },
                    { key: "water", label: "Water Sources", icon: "💧" },
                    { key: "asha", label: "ASHA Workers", icon: "👩‍⚕️" },
                    { key: "healthCenters", label: "Health Centers", icon: "🏥" },
                  ].map((layer) => (
                    <label key={layer.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={layers[layer.key as keyof typeof layers]}
                        onChange={(e) => setLayers({ ...layers, [layer.key]: e.target.checked })}
                        className="rounded"
                      />
                      <span>{layer.icon}</span>
                      <span className="text-sm">{layer.label}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Cases</span>
                    <Badge variant="destructive">127</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Water Issues</span>
                    <Badge variant="warning">22</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ASHA Online</span>
                    <Badge variant="success">143</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Selected Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="font-medium">Rampur Block</p>
                    <p className="text-sm text-muted-foreground mt-1">47 active cases</p>
                    <p className="text-sm text-muted-foreground">3 contaminated sources</p>
                    <Button className="w-full mt-3" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveMap;
