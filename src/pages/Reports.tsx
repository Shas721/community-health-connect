import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Calendar, Clock, Filter, Plus, Eye, Mail, Trash2,
  BarChart3, Droplets, Users, AlertTriangle, Brain
} from "lucide-react";

const reportTypes = [
  { id: "surveillance", name: "Daily Surveillance", icon: BarChart3, color: "bg-primary" },
  { id: "weekly", name: "Weekly Summary", icon: Calendar, color: "bg-info" },
  { id: "monthly", name: "Monthly Analysis", icon: FileText, color: "bg-secondary" },
  { id: "water", name: "Water Quality", icon: Droplets, color: "bg-info" },
  { id: "asha", name: "ASHA Performance", icon: Users, color: "bg-success" },
  { id: "outbreak", name: "Outbreak Response", icon: AlertTriangle, color: "bg-destructive" },
  { id: "ai", name: "AI Predictions", icon: Brain, color: "bg-warning" },
  { id: "quarterly", name: "Quarterly Review", icon: Calendar, color: "bg-secondary" },
];

const recentReports = [
  { id: 1, name: "Weekly_Surveillance_W23_2025.pdf", type: "Weekly Summary", date: "Jun 15, 2025", size: "2.4 MB" },
  { id: 2, name: "Water_Quality_June_2025.pdf", type: "Water Quality", date: "Jun 14, 2025", size: "1.8 MB" },
  { id: 3, name: "AI_Prediction_Report.pdf", type: "AI Predictions", date: "Jun 13, 2025", size: "3.2 MB" },
  { id: 4, name: "ASHA_Performance_Q2.pdf", type: "ASHA Performance", date: "Jun 10, 2025", size: "4.1 MB" },
  { id: 5, name: "Outbreak_Response_Rampur.pdf", type: "Outbreak Response", date: "Jun 08, 2025", size: "1.5 MB" },
];

const scheduledReports = [
  { id: 1, name: "Daily Surveillance", frequency: "Daily at 6:00 AM", nextRun: "Tomorrow", recipients: 12 },
  { id: 2, name: "Weekly Summary", frequency: "Every Monday", nextRun: "Jun 24", recipients: 45 },
  { id: 3, name: "Monthly Analysis", frequency: "1st of month", nextRun: "Jul 01", recipients: 120 },
];

const Reports = () => {
  const [activeItem, setActiveItem] = useState("reports");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Reports & Analytics</h1>
              <p className="text-muted-foreground">Generate and manage health surveillance reports</p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Custom Report
            </Button>
          </div>

          {/* Quick Generate */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Quick Generate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {reportTypes.map((report) => (
                  <button
                    key={report.id}
                    className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-left group"
                  >
                    <div className={`w-10 h-10 rounded-lg ${report.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <report.icon className="w-5 h-5 text-background" />
                    </div>
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Click to generate</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-6">
            {/* Recent Reports */}
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Reports</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{report.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.type} • {report.date} • {report.size}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scheduled Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Scheduled Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{report.name}</p>
                      <Badge variant="outline" className="text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{report.frequency}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Next: {report.nextRun}</span>
                      <span className="text-muted-foreground">{report.recipients} recipients</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Report Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
                <p className="text-xs text-success">This Month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">2.4k</p>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-xs text-success">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Email Distributions</p>
                <p className="text-xs text-success">This Week</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Scheduled Reports</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
