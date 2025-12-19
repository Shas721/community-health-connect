import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, CheckCircle, AlertTriangle, XCircle, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const waterSources = [
  { name: "Tube Well #23", location: "Rampur S2", status: "unsafe", issue: "Coliform +ve" },
  { name: "Hand Pump #45", location: "Rampur S4", status: "moderate", issue: "High TDS" },
  { name: "Tap Water #12", location: "Sitapur", status: "safe", issue: null },
];

const statusConfig = {
  safe: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  moderate: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  unsafe: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

export function WaterQualityCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-info" />
            </div>
            <div>
              <CardTitle className="text-lg">Water Quality</CardTitle>
              <p className="text-sm text-muted-foreground">245 sources monitored</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-success/10">
            <p className="text-2xl font-bold text-success">178</p>
            <p className="text-xs text-muted-foreground">Safe</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-warning/10">
            <p className="text-2xl font-bold text-warning">45</p>
            <p className="text-xs text-muted-foreground">Moderate</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <p className="text-2xl font-bold text-destructive">22</p>
            <p className="text-xs text-muted-foreground">Unsafe</p>
          </div>
        </div>

        {/* Recent issues */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Issues</h4>
          {waterSources.map((source) => {
            const config = statusConfig[source.status as keyof typeof statusConfig];
            const Icon = config.icon;
            return (
              <div key={source.name} className={`flex items-center gap-3 p-3 rounded-lg ${config.bg}`}>
                <Icon className={`w-5 h-5 ${config.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{source.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {source.location}
                    {source.issue && ` • ${source.issue}`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* IoT sensor status */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">IoT Sensors Online</span>
            <span className="text-sm text-success font-semibold">38/45</span>
          </div>
          <Progress value={84} className="h-1.5" />
        </div>

        <Button variant="outline" className="w-full" size="sm">
          View All Sources
        </Button>
      </CardContent>
    </Card>
  );
}
