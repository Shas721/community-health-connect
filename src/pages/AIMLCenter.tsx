import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, TrendingUp, AlertTriangle, RefreshCw,
  Zap, Database, Activity, Target, Bell, Send
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const villagePredictions = [
  { village: "Avalahalli", risk: 78, trend: "up", disease: "Diarrhea", cases: 23, factors: ["Water contamination", "Monsoon season"] },
  { village: "Nagenahalli", risk: 52, trend: "up", disease: "Fever", cases: 12, factors: ["Mosquito breeding", "Stagnant water"] },
  { village: "Singhanayakanahalli", risk: 45, trend: "stable", disease: "Viral Fever", cases: 8, factors: ["Seasonal pattern"] },
  { village: "Yelahanka", risk: 23, trend: "down", disease: "None", cases: 4, factors: ["Good sanitation"] },
];

const diseasePredictions = [
  { disease: "Diarrhea", totalRisk: 82, affectedVillages: ["Avalahalli", "Nagenahalli"], predictedCases: 35 },
  { disease: "Dengue", totalRisk: 58, affectedVillages: ["Nagenahalli", "Singhanayakanahalli"], predictedCases: 15 },
  { disease: "Viral Fever", totalRisk: 45, affectedVillages: ["Singhanayakanahalli"], predictedCases: 10 },
  { disease: "Malaria", totalRisk: 25, affectedVillages: ["Nagenahalli"], predictedCases: 5 },
];

const AIMLCenter = () => {
  const [activeItem, setActiveItem] = useState("ai");

  const handleNotifyASHA = (village: string) => {
    toast({
      title: "ASHA Workers Notified",
      description: `Alert sent to ASHA workers in ${village} about outbreak risk.`,
    });
  };

  const handleGenerateAlert = (disease: string) => {
    toast({
      title: "Alert Generated",
      description: `Public health alert created for ${disease} outbreak prediction.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">AI/ML Prediction Center</h1>
              <p className="text-muted-foreground">Village-wise & Disease-wise outbreak predictions for Yelahanka PHC</p>
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
                    <h3 className="text-xl font-semibold">GramCare AI Model v2.3</h3>
                    <p className="text-muted-foreground">Last updated: 2 hours ago • Accuracy: 89.3%</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold">89.3%</p>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-sm text-muted-foreground">Villages</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-sm text-muted-foreground">Diseases Tracked</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Village-wise Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-warning" />
                  Village-wise Predictions (Next 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {villagePredictions.map((pred) => (
                  <div key={pred.village} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <p className="font-medium">{pred.village}</p>
                        <Badge variant={pred.risk > 60 ? "destructive" : pred.risk > 30 ? "warning" : "success"}>
                          {pred.risk}% Risk
                        </Badge>
                        {pred.disease !== "None" && (
                          <Badge variant="outline">{pred.disease}: {pred.cases} cases</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`w-4 h-4 ${pred.trend === "up" ? "text-destructive" : pred.trend === "down" ? "text-success rotate-180" : "text-muted-foreground"}`} />
                        <Button variant="outline" size="sm" onClick={() => handleNotifyASHA(pred.village)}>
                          <Bell className="w-3 h-3 mr-1" />
                          Notify ASHA
                        </Button>
                      </div>
                    </div>
                    <Progress value={pred.risk} className="h-2 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      {pred.factors.map((factor) => (
                        <Badge key={factor} variant="secondary" className="text-xs">{factor}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Disease-wise Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-destructive" />
                  Disease-wise Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {diseasePredictions.map((pred) => (
                  <div key={pred.disease} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <p className="font-medium">{pred.disease}</p>
                        <Badge variant={pred.totalRisk > 60 ? "destructive" : pred.totalRisk > 30 ? "warning" : "success"}>
                          {pred.totalRisk}% Risk
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateAlert(pred.disease)}>
                        <Zap className="w-3 h-3 mr-1" />
                        Generate Alert
                      </Button>
                    </div>
                    <Progress value={pred.totalRisk} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Predicted cases: {pred.predictedCases}</span>
                      <span>Villages: {pred.affectedVillages.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5" onClick={() => toast({ title: "Alert sent to all ASHA workers" })}>
              <CardContent className="p-6 text-center">
                <Send className="w-8 h-8 mx-auto text-primary mb-2" />
                <p className="font-medium">Notify All ASHA</p>
                <p className="text-sm text-muted-foreground">Send bulk alerts</p>
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