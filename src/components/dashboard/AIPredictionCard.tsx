import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const predictions = [
  { area: "Rampur Block", risk: 78, trend: "up", severity: "high" },
  { area: "Sitapur North", risk: 52, trend: "up", severity: "medium" },
  { area: "Laharpur", risk: 23, trend: "down", severity: "low" },
];

const severityColors = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-success text-success-foreground",
};

export function AIPredictionCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Predictions</CardTitle>
              <p className="text-sm text-muted-foreground">Next 7 days forecast</p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Model confidence */}
        <div className="p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Model Confidence</span>
            <span className="text-sm text-primary font-semibold">89.3%</span>
          </div>
          <Progress value={89.3} className="h-2" />
        </div>

        {/* Risk predictions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            Outbreak Risk Assessment
          </h4>
          {predictions.map((pred) => (
            <div key={pred.area} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{pred.area}</span>
                  <Badge className={severityColors[pred.severity as keyof typeof severityColors]}>
                    {pred.risk}%
                  </Badge>
                </div>
                <Progress 
                  value={pred.risk} 
                  className="h-1.5"
                />
              </div>
              <TrendingUp className={`w-4 h-4 ${pred.trend === "up" ? "text-destructive" : "text-success rotate-180"}`} />
            </div>
          ))}
        </div>

        {/* Contributing factors */}
        <div className="p-4 rounded-lg border border-info/30 bg-info/5">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-info mt-0.5" />
            <div>
              <p className="text-sm font-medium text-info">Contributing Factors</p>
              <p className="text-xs text-muted-foreground mt-1">
                Heavy rainfall, poor water quality, historical pattern match
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            View Full Analysis
          </Button>
          <Button variant="default" className="flex-1" size="sm">
            Generate Alert
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
