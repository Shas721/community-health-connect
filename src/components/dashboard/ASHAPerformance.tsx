import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Trophy, Star, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const topPerformers = [
  { name: "Kamla Devi", village: "Rampur S2", surveys: 89, score: 4.9, rank: 1 },
  { name: "Sunita Devi", village: "Rampur S4", surveys: 76, score: 4.8, rank: 2 },
  { name: "Meera Yadav", village: "Sitapur N", surveys: 72, score: 4.6, rank: 3 },
];

const rankColors = {
  1: "from-yellow-400 to-amber-500",
  2: "from-gray-300 to-gray-400",
  3: "from-amber-600 to-amber-700",
};

export function ASHAPerformance() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <CardTitle className="text-lg">ASHA Performance</CardTitle>
              <p className="text-sm text-muted-foreground">156 workers active</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-success/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium">143 Online</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">92% active today</p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">234 Surveys</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Today's submissions</p>
          </div>
        </div>

        {/* Top performers */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warning" />
            <h4 className="text-sm font-medium">Top Performers</h4>
          </div>
          {topPerformers.map((worker) => (
            <div 
              key={worker.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm">
                    {worker.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br ${rankColors[worker.rank as keyof typeof rankColors]} flex items-center justify-center text-xs font-bold text-background shadow-sm`}>
                  {worker.rank}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{worker.name}</p>
                <p className="text-xs text-muted-foreground">{worker.village}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{worker.surveys}</p>
                <div className="flex items-center gap-1 text-xs text-warning">
                  <Star className="w-3 h-3 fill-current" />
                  {worker.score}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Training progress */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Training Completion</span>
            <span className="text-sm text-primary font-semibold">89%</span>
          </div>
          <Progress value={89} className="h-1.5" />
        </div>

        <Button variant="outline" className="w-full" size="sm">
          View All Workers
        </Button>
      </CardContent>
    </Card>
  );
}
