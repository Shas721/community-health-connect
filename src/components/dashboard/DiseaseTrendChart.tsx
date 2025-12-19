import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download } from "lucide-react";

const data = [
  { day: "Mon", diarrhea: 12, fever: 8, cholera: 2, typhoid: 1 },
  { day: "Tue", diarrhea: 19, fever: 12, cholera: 3, typhoid: 2 },
  { day: "Wed", diarrhea: 25, fever: 15, cholera: 5, typhoid: 3 },
  { day: "Thu", diarrhea: 32, fever: 10, cholera: 4, typhoid: 2 },
  { day: "Fri", diarrhea: 47, fever: 18, cholera: 6, typhoid: 4 },
  { day: "Sat", diarrhea: 42, fever: 22, cholera: 5, typhoid: 3 },
  { day: "Sun", diarrhea: 67, fever: 28, cholera: 8, typhoid: 5 },
];

export function DiseaseTrendChart() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Disease Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Last 7 days surveillance data</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDiarrhea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFever" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCholera" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTyphoid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="day" 
                className="text-xs fill-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                className="text-xs fill-muted-foreground"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px hsl(var(--foreground) / 0.1)"
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="diarrhea" 
                name="Diarrhea"
                stroke="hsl(var(--destructive))" 
                fillOpacity={1}
                fill="url(#colorDiarrhea)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="fever" 
                name="Fever"
                stroke="hsl(var(--warning))" 
                fillOpacity={1}
                fill="url(#colorFever)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="cholera" 
                name="Cholera"
                stroke="hsl(var(--info))" 
                fillOpacity={1}
                fill="url(#colorCholera)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="typhoid" 
                name="Typhoid"
                stroke="hsl(var(--secondary))" 
                fillOpacity={1}
                fill="url(#colorTyphoid)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
