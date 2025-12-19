import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    title: "Outbreak Alert - Rampur Block",
    message: "47 diarrhea cases detected in Sector 2, 3, 4",
    time: "2 hours ago",
    severity: "critical",
    status: "active",
    acknowledged: "189/234"
  },
  {
    id: 2,
    title: "Water Contamination - Tube Well #23",
    message: "Coliform positive, immediate action required",
    time: "5 hours ago",
    severity: "high",
    status: "active",
    acknowledged: "38/45"
  },
  {
    id: 3,
    title: "Fever Cluster - Misrikh",
    message: "12 fever cases in concentrated area",
    time: "1 day ago",
    severity: "medium",
    status: "resolved",
    acknowledged: "56/56"
  },
];

const severityConfig = {
  critical: { color: "bg-destructive", text: "Critical", badge: "destructive" as const },
  high: { color: "bg-warning", text: "High", badge: "warning" as const },
  medium: { color: "bg-info", text: "Medium", badge: "info" as const },
};

export function RecentAlerts() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <CardTitle className="text-lg">Recent Alerts</CardTitle>
              <p className="text-sm text-muted-foreground">3 active alerts</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity as keyof typeof severityConfig];
          return (
            <div 
              key={alert.id}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${config.color} ${alert.status === 'active' ? 'animate-pulse' : ''}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium truncate">{alert.title}</h4>
                    <Badge variant={config.badge} className="text-xs">
                      {config.text}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {alert.status === 'resolved' ? (
                        <CheckCircle className="w-3 h-3 text-success" />
                      ) : null}
                      {alert.acknowledged} acknowledged
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}

        <Button variant="gradient" className="w-full">
          Create New Alert
        </Button>
      </CardContent>
    </Card>
  );
}
