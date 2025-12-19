import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Layers, ZoomIn, ZoomOut, Locate } from "lucide-react";

const hotspots = [
  { name: "Rampur", cases: 47, x: 35, y: 25, severity: "high" },
  { name: "Sitapur", cases: 23, x: 55, y: 40, severity: "medium" },
  { name: "Misrikh", cases: 18, x: 70, y: 55, severity: "medium" },
  { name: "Laharpur", cases: 5, x: 25, y: 65, severity: "low" },
  { name: "Mahmudabad", cases: 3, x: 80, y: 30, severity: "low" },
];

const severityColors = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-success",
};

export function MapCard() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Map className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-lg">Outbreak Hotspots</CardTitle>
              <p className="text-sm text-muted-foreground">Real-time disease mapping</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Layers className="w-4 h-4" />
            </Button>
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
        </div>
      </CardHeader>
      <CardContent>
        {/* Simulated map area */}
        <div className="relative h-[300px] rounded-xl bg-gradient-to-br from-muted/50 to-muted overflow-hidden border border-border">
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
          
          {/* District outline simulation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M20,20 Q30,10 50,15 Q70,20 80,30 Q90,50 85,70 Q75,85 50,90 Q25,85 15,70 Q10,50 20,20" 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="0.5"
              strokeDasharray="2,2"
              opacity="0.5"
            />
          </svg>

          {/* Hotspots */}
          {hotspots.map((spot) => (
            <div
              key={spot.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
              {/* Pulse effect */}
              <div className={`absolute w-12 h-12 rounded-full ${severityColors[spot.severity as keyof typeof severityColors]} opacity-20 animate-ping`} />
              <div className={`absolute w-12 h-12 rounded-full ${severityColors[spot.severity as keyof typeof severityColors]} opacity-10`} />
              
              {/* Marker */}
              <div className={`relative w-8 h-8 rounded-full ${severityColors[spot.severity as keyof typeof severityColors]} flex items-center justify-center text-xs font-bold text-destructive-foreground shadow-lg border-2 border-background`}>
                {spot.cases}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <p className="text-sm font-medium">{spot.name}</p>
                <p className="text-xs text-muted-foreground">{spot.cases} active cases</p>
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border">
            <p className="text-xs font-medium mb-2">Case Severity</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-xs">High (&gt;30)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-xs">Medium (10-30)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs">Low (&lt;10)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Last updated: <span className="font-medium text-foreground">2 minutes ago</span>
          </p>
          <Button size="sm">
            Open Full Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
