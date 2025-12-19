import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, Bell, Sun, Droplets, Thermometer, Phone, BookOpen, 
  Hospital, AlertTriangle, MapPin, Heart, Baby, Pill, ArrowRight,
  Menu, X, User, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CitizenPortal = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const healthTips = [
    { icon: Droplets, tip: "Drink boiled water to prevent diseases", tipHindi: "उबला पानी पिएं, बीमारी से बचें" },
    { icon: Sun, tip: "Wash hands before eating", tipHindi: "खाने से पहले हाथ धोएं" },
    { icon: Heart, tip: "Exercise daily for 30 minutes", tipHindi: "रोज़ 30 मिनट व्यायाम करें" },
  ];

  const quickActions = [
    { icon: Thermometer, label: "I'm Sick", labelHindi: "मैं बीमार हूं", color: "bg-destructive", action: "/citizen/report" },
    { icon: Droplets, label: "Water Issue", labelHindi: "पानी की समस्या", color: "bg-info", action: "/citizen/water" },
    { icon: Phone, label: "Call ASHA", labelHindi: "आशा को कॉल करें", color: "bg-success", action: "tel:1800123456" },
    { icon: BookOpen, label: "Health Tips", labelHindi: "स्वास्थ्य सुझाव", color: "bg-warning", action: "/citizen/learn" },
    { icon: Hospital, label: "Nearby Hospital", labelHindi: "नजदीकी अस्पताल", color: "bg-secondary", action: "/citizen/hospitals" },
    { icon: AlertTriangle, label: "Emergency", labelHindi: "आपातकालीन", color: "bg-destructive", action: "tel:112" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display font-bold">स्वास्थ्य साथी</h1>
              <p className="text-xs opacity-80">Health Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-background/20">
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-background/20"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b shadow-lg animate-slide-up">
            <nav className="p-4 space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted">
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => navigate("/")}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-destructive"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 pb-24">
        {/* Health Tip of the Day */}
        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-success">Today's Health Tip</span>
            </div>
            <p className="font-medium">{healthTips[0].tipHindi}</p>
            <p className="text-sm text-muted-foreground">{healthTips[0].tip}</p>
          </CardContent>
        </Card>

        {/* Alert Banner */}
        <Card className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground border-0">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            <div className="flex-1">
              <p className="font-medium text-sm">Health Alert</p>
              <p className="text-xs opacity-90">Diarrhea cases in your area. Boil water before drinking!</p>
            </div>
            <ArrowRight className="w-5 h-5" />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-3">What do you need? / आपको क्या चाहिए?</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5"
                onClick={() => {
                  if (action.action.startsWith("tel:")) {
                    window.location.href = action.action;
                  }
                }}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto rounded-xl ${action.color} flex items-center justify-center mb-2`}>
                    <action.icon className="w-6 h-6 text-background" />
                  </div>
                  <p className="font-medium text-sm">{action.labelHindi}</p>
                  <p className="text-xs text-muted-foreground">{action.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Water Quality Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Droplets className="w-5 h-5 text-info" />
              Water Quality in Your Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                <span className="font-medium text-success">SAFE ✅</span>
              </div>
              <span className="text-sm text-muted-foreground">Last checked: 2 hours ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Health Services */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Health Services / स्वास्थ्य सेवाएं</h2>
          <div className="space-y-3">
            <Card className="cursor-pointer hover:shadow-md transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Baby className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Maternal Care</p>
                  <p className="text-sm text-muted-foreground">Pregnancy checkups & support</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Vaccination Schedule</p>
                  <p className="text-sm text-muted-foreground">Immunization calendar</p>
                </div>
                <Badge>2 Due</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-info" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Find Healthcare</p>
                  <p className="text-sm text-muted-foreground">Hospitals, PHCs & clinics</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your ASHA Worker */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Your ASHA Worker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
                SD
              </div>
              <div className="flex-1">
                <p className="font-medium">Sunita Devi</p>
                <p className="text-sm text-muted-foreground">Village: Rampur Sector 2</p>
              </div>
              <Button variant="success" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around">
        <button className="flex flex-col items-center p-2 text-primary">
          <Shield className="w-5 h-5" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground">
          <Thermometer className="w-5 h-5" />
          <span className="text-xs mt-1">Report</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs mt-1">Learn</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-xs mt-1">SOS</span>
        </button>
        <button className="flex flex-col items-center p-2 text-muted-foreground">
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default CitizenPortal;
