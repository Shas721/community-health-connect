import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, TrendingUp, AlertTriangle, CheckCircle, Info, RefreshCw,
  Zap, Database, Activity, Target
} from "lucide-react";

const predictions = [
  { area: "Rampur Block", risk: 78, trend: "up", factors: ["Heavy rainfall", "Poor sanitation", "Historical pattern"] },
  { area: "Sitapur North", risk: 52, trend: "up", factors: ["Water contamination", "Crowded areas"] },
  { area: "Misrikh", risk: 45, trend: "stable", factors: ["Seasonal pattern", "Migration"] },
  { area: "Laharpur", risk: 23, trend: "down", factors: ["Improved sanitation"] },
  { area: "Mahmudabad", risk: 15, trend: "down", factors: ["Clean water sources"] },
];

const modelMetrics = [
  { name: "Model Accuracy", value: 89.3, target: 90, status: "good" },
  { name: "Precision", value: 87.5, target: 85, status: "excellent" },
  { name: "Recall", value: 91.2, target: 88, status: "excellent" },
  { name: "F1 Score", value: 89.3, target: 87, status: "excellent" },
];

const recentPredictions = [
  { date: "Jun 15", predicted: 45, actual: 47, accuracy: 96 },
  { date: "Jun 14", predicted: 38, actual: 42, accuracy: 90 },
  { date: "Jun 13", predicted: 52, actual: 48, accuracy: 92 },
  { date: "Jun 12", predicted: 35, actual: 33, accuracy: 94 },
];

const AIMLCenter = () => {
  const [activeItem, setActiveItem] = useState("ai");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">AI/ML Prediction Center</h1>
              <p className="text-muted-foreground">Outbreak prediction and risk assessment</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Model Active
              </Badge>
              <Button variant="hero">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retrain Model
              </Button>
            </div>
          </div>

          {/* Model Status */}
          <Card className="mb-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Brain className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Outbreak Prediction Model v2.3</h3>
                    <p className="text-muted-foreground">Last updated: 2 hours ago • Training data: 2.3M records</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-8">
                  {modelMetrics.map((metric) => (
                    <div key={metric.name} className="text-center">
                      <p className="text-2xl font-bold">{metric.value}%</p>
                      <p className="text-sm text-muted-foreground">{metric.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Risk Predictions */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-warning" />
                  Outbreak Risk Predictions (Next 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictions.map((pred) => (
                  <div key={pred.area} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <p className="font-medium">{pred.area}</p>
                        <Badge 
                          variant={pred.risk > 60 ? "destructive" : pred.risk > 30 ? "warning" : "success"}
                        >
                          {pred.risk}% Risk
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className={`w-4 h-4 ${pred.trend === "up" ? "text-destructive" : pred.trend === "down" ? "text-success rotate-180" : "text-muted-foreground"}`} />
                        <span className="capitalize">{pred.trend}</span>
                      </div>
                    </div>
                    <Progress 
                      value={pred.risk} 
                      className="h-2 mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                      {pred.factors.map((factor) => (
                        <Badge key={factor} variant="secondary" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Model Performance */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Prediction Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPredictions.map((pred) => (
                    <div key={pred.date} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">{pred.date}</p>
                        <p className="text-xs text-muted-foreground">
                          Predicted: {pred.predicted} | Actual: {pred.actual}
                        </p>
                      </div>
                      <Badge variant={pred.accuracy >= 95 ? "success" : pred.accuracy >= 90 ? "warning" : "destructive"}>
                        {pred.accuracy}%
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Data Sources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health Surveys</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Water Quality</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weather Data</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Population Data</span>
                    <Badge variant="success">Connected</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto text-warning mb-2" />
                <p className="font-medium">Generate Alert</p>
                <p className="text-sm text-muted-foreground">From prediction</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="font-medium">Run Analysis</p>
                <p className="text-sm text-muted-foreground">Deep dive</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardContent className="p-6 text-center">
                <Activity className="w-8 h-8 mx-auto text-info mb-2" />
                <p className="font-medium">View Trends</p>
                <p className="text-sm text-muted-foreground">Historical</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5">
              <CardContent className="p-6 text-center">
                <Database className="w-8 h-8 mx-auto text-secondary mb-2" />
                <p className="font-medium">Export Data</p>
                <p className="text-sm text-muted-foreground">For research</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIMLCenter;
