import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, Search, Filter, Plus, Star, Phone, MapPin, Clock,
  TrendingUp, Award, BookOpen, MoreVertical
} from "lucide-react";

const ashaWorkers = [
  { id: 1, name: "Kamla Devi", village: "Rampur S2", phone: "9876543210", surveys: 89, score: 4.9, status: "online", lastActive: "5 mins ago", training: 100 },
  { id: 2, name: "Sunita Devi", village: "Rampur S4", phone: "9876543211", surveys: 76, score: 4.8, status: "online", lastActive: "12 mins ago", training: 95 },
  { id: 3, name: "Meera Yadav", village: "Sitapur N", phone: "9876543212", surveys: 72, score: 4.6, status: "away", lastActive: "1 hr ago", training: 88 },
  { id: 4, name: "Geeta Sharma", village: "Misrikh", phone: "9876543213", surveys: 65, score: 4.5, status: "online", lastActive: "2 mins ago", training: 92 },
  { id: 5, name: "Rani Singh", village: "Laharpur", phone: "9876543214", surveys: 58, score: 4.2, status: "offline", lastActive: "3 hrs ago", training: 78 },
  { id: 6, name: "Sita Patel", village: "Mahmudabad", phone: "9876543215", surveys: 52, score: 4.4, status: "online", lastActive: "20 mins ago", training: 85 },
];

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

const ASHAManagement = () => {
  const [activeItem, setActiveItem] = useState("asha");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkers = ashaWorkers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">ASHA Worker Management</h1>
              <p className="text-muted-foreground">156 workers registered in the district</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Worker
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Total Workers</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">143</p>
                  <p className="text-sm text-muted-foreground">Online Now</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">234</p>
                  <p className="text-sm text-muted-foreground">Surveys Today</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">Training Complete</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filter */}
          <Card className="mb-6">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or village..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </CardContent>
          </Card>

          {/* Workers Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredWorkers.map((worker) => (
                  <div key={worker.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${statusColors[worker.status as keyof typeof statusColors]}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{worker.name}</p>
                        <div className="flex items-center gap-1 text-warning text-sm">
                          <Star className="w-3 h-3 fill-current" />
                          {worker.score}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {worker.village}
                        <span className="text-muted-foreground/50">•</span>
                        <Phone className="w-3 h-3" />
                        {worker.phone}
                      </p>
                    </div>

                    <div className="text-center px-4">
                      <p className="text-lg font-bold">{worker.surveys}</p>
                      <p className="text-xs text-muted-foreground">Surveys</p>
                    </div>

                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Training</span>
                        <span>{worker.training}%</span>
                      </div>
                      <Progress value={worker.training} className="h-1.5" />
                    </div>

                    <div className="text-right">
                      <Badge variant={worker.status === "online" ? "success" : worker.status === "away" ? "warning" : "secondary"} className="capitalize mb-1">
                        {worker.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        {worker.lastActive}
                      </p>
                    </div>

                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ASHAManagement;
