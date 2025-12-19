import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, TrendingUp, TrendingDown, Calendar, Download, Filter,
  Activity, Users, Droplets, MapPin
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

const weeklyData = [
  { week: "W1", diarrhea: 45, fever: 32, cholera: 8, typhoid: 5 },
  { week: "W2", diarrhea: 52, fever: 38, cholera: 12, typhoid: 7 },
  { week: "W3", diarrhea: 67, fever: 45, cholera: 15, typhoid: 9 },
  { week: "W4", diarrhea: 89, fever: 52, cholera: 18, typhoid: 11 },
];

const blockData = [
  { name: "Rampur", cases: 47, color: "#ef4444" },
  { name: "Sitapur N", cases: 23, color: "#f59e0b" },
  { name: "Misrikh", cases: 18, color: "#f59e0b" },
  { name: "Laharpur", cases: 12, color: "#22c55e" },
  { name: "Mahmudabad", cases: 8, color: "#22c55e" },
];

const diseaseDistribution = [
  { name: "Diarrhea", value: 45, color: "#ef4444" },
  { name: "Fever", value: 28, color: "#f59e0b" },
  { name: "Cholera", value: 15, color: "#3b82f6" },
  { name: "Typhoid", value: 12, color: "#8b5cf6" },
];

const Analytics = () => {
  const [activeItem, setActiveItem] = useState("analytics");
  const [period, setPeriod] = useState("month");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive health data analysis</p>
            </div>
            <div className="flex gap-2">
              <div className="flex bg-muted rounded-lg p-1">
                {["week", "month", "quarter", "year"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1 rounded-md text-sm capitalize transition-colors ${
                      period === p ? "bg-background shadow" : "hover:bg-background/50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Activity className="w-8 h-8 text-destructive" />
                  <Badge className="bg-destructive/20 text-destructive">+23%</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">127</p>
                <p className="text-sm text-muted-foreground">Active Cases</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <TrendingDown className="w-8 h-8 text-success" />
                  <Badge className="bg-success/20 text-success">-15%</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">892</p>
                <p className="text-sm text-muted-foreground">Resolved Cases</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Droplets className="w-8 h-8 text-info" />
                  <Badge className="bg-info/20 text-info">89%</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">245</p>
                <p className="text-sm text-muted-foreground">Water Sources</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Users className="w-8 h-8 text-secondary" />
                  <Badge className="bg-secondary/20 text-secondary">92%</Badge>
                </div>
                <p className="text-2xl font-bold mt-2">156</p>
                <p className="text-sm text-muted-foreground">ASHA Workers</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Disease Trends (Weekly)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorDiarrhea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorFever" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Area type="monotone" dataKey="diarrhea" stroke="#ef4444" fillOpacity={1} fill="url(#colorDiarrhea)" />
                      <Area type="monotone" dataKey="fever" stroke="#f59e0b" fillOpacity={1} fill="url(#colorFever)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Block-wise Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Cases by Block
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={blockData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="name" type="category" className="text-xs" width={80} />
                      <Tooltip />
                      <Bar dataKey="cases" radius={[0, 4, 4, 0]}>
                        {blockData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Disease Distribution Pie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Disease Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={diseaseDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {diseaseDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Key Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold mt-1">1.2 hrs</p>
                    <p className="text-xs text-success flex items-center gap-1 mt-1">
                      <TrendingDown className="w-3 h-3" /> 18% faster
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Survey Completion</p>
                    <p className="text-2xl font-bold mt-1">94%</p>
                    <p className="text-xs text-success flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> 5% increase
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">AI Prediction Accuracy</p>
                    <p className="text-2xl font-bold mt-1">89.3%</p>
                    <p className="text-xs text-success flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> Improving
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Water Quality Score</p>
                    <p className="text-2xl font-bold mt-1">73%</p>
                    <p className="text-xs text-warning flex items-center gap-1 mt-1">
                      <TrendingDown className="w-3 h-3" /> Needs attention
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
