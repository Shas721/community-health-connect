import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, Bell, Sun, Droplets, Thermometer, Phone, BookOpen, 
  Hospital, AlertTriangle, MapPin, Baby, Pill, ArrowRight,
  Menu, X, User, LogOut, Cloud, Wind, History, Stethoscope,
  FileText, GraduationCap, Languages, CheckCircle, Clock,
  Navigation, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Language = "en" | "hi" | "kn";

const translations = {
  en: {
    appName: "GramCare",
    tagline: "Your Health Companion",
    healthTip: "Today's Health Tip",
    whatDoYouNeed: "What do you need?",
    waterQuality: "Water Quality in Your Area",
    yourAshaWorker: "Your ASHA Worker",
    healthServices: "Health Services",
    imSick: "I'm Sick",
    waterIssue: "Water Issue",
    callAsha: "Call ASHA",
    healthTips: "Health Tips",
    nearbyHospital: "Nearby Hospital",
    emergency: "Emergency",
    home: "Home",
    report: "Report",
    learn: "Learn",
    sos: "SOS",
    profile: "Profile",
    safe: "SAFE",
    lastChecked: "Last checked",
    call: "Call",
    maternalCare: "Maternal Care",
    vaccination: "Vaccination Schedule",
    findHealthcare: "Find Healthcare",
    weather: "Weather",
    aqi: "Air Quality",
    location: "Location",
    myHealthHistory: "My Health History",
  },
  hi: {
    appName: "ग्रामकेयर",
    tagline: "आपका स्वास्थ्य साथी",
    healthTip: "आज की स्वास्थ्य टिप",
    whatDoYouNeed: "आपको क्या चाहिए?",
    waterQuality: "आपके क्षेत्र में पानी की गुणवत्ता",
    yourAshaWorker: "आपकी आशा कार्यकर्ता",
    healthServices: "स्वास्थ्य सेवाएं",
    imSick: "मैं बीमार हूं",
    waterIssue: "पानी की समस्या",
    callAsha: "आशा को कॉल करें",
    healthTips: "स्वास्थ्य सुझाव",
    nearbyHospital: "नजदीकी अस्पताल",
    emergency: "आपातकालीन",
    home: "होम",
    report: "रिपोर्ट",
    learn: "सीखें",
    sos: "SOS",
    profile: "प्रोफ़ाइल",
    safe: "सुरक्षित",
    lastChecked: "अंतिम जांच",
    call: "कॉल",
    maternalCare: "मातृ देखभाल",
    vaccination: "टीकाकरण अनुसूची",
    findHealthcare: "स्वास्थ्य सेवा खोजें",
    weather: "मौसम",
    aqi: "वायु गुणवत्ता",
    location: "स्थान",
    myHealthHistory: "मेरा स्वास्थ्य इतिहास",
  },
  kn: {
    appName: "ಗ್ರಾಮ್‌ಕೇರ್",
    tagline: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಂಗಾತಿ",
    healthTip: "ಇಂದಿನ ಆರೋಗ್ಯ ಸಲಹೆ",
    whatDoYouNeed: "ನಿಮಗೆ ಏನು ಬೇಕು?",
    waterQuality: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ನೀರಿನ ಗುಣಮಟ್ಟ",
    yourAshaWorker: "ನಿಮ್ಮ ಆಶಾ ಕಾರ್ಯಕರ್ತ",
    healthServices: "ಆರೋಗ್ಯ ಸೇವೆಗಳು",
    imSick: "ನಾನು ಅನಾರೋಗ್ಯ",
    waterIssue: "ನೀರಿನ ಸಮಸ್ಯೆ",
    callAsha: "ಆಶಾಗೆ ಕರೆ",
    healthTips: "ಆರೋಗ್ಯ ಸಲಹೆಗಳು",
    nearbyHospital: "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ",
    emergency: "ತುರ್ತು",
    home: "ಮನೆ",
    report: "ವರದಿ",
    learn: "ಕಲಿಯಿರಿ",
    sos: "SOS",
    profile: "ಪ್ರೊಫೈಲ್",
    safe: "ಸುರಕ್ಷಿತ",
    lastChecked: "ಕೊನೆಯ ಪರಿಶೀಲನೆ",
    call: "ಕರೆ",
    maternalCare: "ಮಾತೃ ಆರೈಕೆ",
    vaccination: "ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿ",
    findHealthcare: "ಆರೋಗ್ಯ ಸೇವೆ ಹುಡುಕಿ",
    weather: "ಹವಾಮಾನ",
    aqi: "ವಾಯು ಗುಣಮಟ್ಟ",
    location: "ಸ್ಥಳ",
    myHealthHistory: "ನನ್ನ ಆರೋಗ್ಯ ಇತಿಹಾಸ",
  },
};

const healthTipsData = {
  en: [
    { tip: "Drink boiled water to prevent diseases", icon: Droplets },
    { tip: "Wash hands before eating", icon: Sun },
    { tip: "Exercise daily for 30 minutes", icon: Heart },
  ],
  hi: [
    { tip: "उबला पानी पिएं, बीमारी से बचें", icon: Droplets },
    { tip: "खाने से पहले हाथ धोएं", icon: Sun },
    { tip: "रोज़ 30 मिनट व्यायाम करें", icon: Heart },
  ],
  kn: [
    { tip: "ರೋಗಗಳನ್ನು ತಡೆಯಲು ಕುದಿಸಿದ ನೀರು ಕುಡಿಯಿರಿ", icon: Droplets },
    { tip: "ಊಟಕ್ಕೆ ಮುಂಚೆ ಕೈ ತೊಳೆಯಿರಿ", icon: Sun },
    { tip: "ದಿನಕ್ಕೆ 30 ನಿಮಿಷ ವ್ಯಾಯಾಮ ಮಾಡಿ", icon: Heart },
  ],
};

const hospitals = [
  { name: "PHC Yelahanka", distance: "2.5 km", type: "Primary Health Center", phone: "080-23456789" },
  { name: "Government Hospital Yelahanka", distance: "4.2 km", type: "General Hospital", phone: "080-23456790" },
  { name: "ESI Hospital", distance: "5.8 km", type: "ESI Hospital", phone: "080-23456791" },
];

const healthHistory = [
  { date: "Dec 10, 2025", condition: "Fever & Cold", status: "Recovered", doctor: "PHC Yelahanka" },
  { date: "Nov 5, 2025", condition: "Routine Checkup", status: "Normal", doctor: "ASHA Visit" },
  { date: "Oct 15, 2025", condition: "Vaccination", status: "Completed", doctor: "PHC Yelahanka" },
];

const learnTopics = [
  { title: "Water Safety", titleKn: "ನೀರಿನ ಸುರಕ್ಷತೆ", titleHi: "पानी की सुरक्षा", videos: 4, icon: Droplets },
  { title: "Mosquito Diseases", titleKn: "ಸೊಳ್ಳೆ ರೋಗಗಳು", titleHi: "मच्छर जनित रोग", videos: 3, icon: AlertTriangle },
  { title: "Hygiene & Handwashing", titleKn: "ಶುಚಿತ್ವ", titleHi: "स्वच्छता", videos: 5, icon: Sun },
  { title: "Nutrition", titleKn: "ಪೋಷಣೆ", titleHi: "पोषण", videos: 4, icon: Heart },
];

const CitizenPortal = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState("home");
  const [sickDialogOpen, setSickDialogOpen] = useState(false);
  const [waterDialogOpen, setWaterDialogOpen] = useState(false);
  const [hospitalsDialogOpen, setHospitalsDialogOpen] = useState(false);
  const [tipsDialogOpen, setTipsDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [sosDialogOpen, setSosDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [learnDialogOpen, setLearnDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomDays, setSymptomDays] = useState("1");
  const [symptomDetails, setSymptomDetails] = useState("");
  const [waterIssueType, setWaterIssueType] = useState("");
  const [waterIssueDetails, setWaterIssueDetails] = useState("");

  const t = translations[language];
  const tips = healthTipsData[language];

  const weatherData = {
    temp: "28°C",
    condition: language === "en" ? "Partly Cloudy" : language === "hi" ? "आंशिक बादल" : "ಭಾಗಶಃ ಮೋಡ",
    humidity: "65%",
    aqi: 85,
    aqiStatus: language === "en" ? "Moderate" : language === "hi" ? "मध्यम" : "ಮಧ್ಯಮ",
  };

  const handleSickSubmit = () => {
    toast({ 
      title: language === "en" ? "Report Submitted" : language === "hi" ? "रिपोर्ट जमा" : "ವರದಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
      description: language === "en" ? "Your ASHA worker will contact you within 2 hours" : language === "hi" ? "आपकी आशा कार्यकर्ता 2 घंटे में संपर्क करेंगी" : "ನಿಮ್ಮ ಆಶಾ ಕಾರ್ಯಕರ್ತ 2 ಗಂಟೆಯೊಳಗೆ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ"
    });
    setSickDialogOpen(false);
    setSymptoms([]);
    setSymptomDays("1");
    setSymptomDetails("");
  };

  const handleWaterSubmit = () => {
    toast({ 
      title: language === "en" ? "Issue Reported" : language === "hi" ? "समस्या दर्ज" : "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಲಾಗಿದೆ",
      description: language === "en" ? "Authorities have been notified" : language === "hi" ? "अधिकारियों को सूचित किया गया" : "ಅಧಿಕಾರಿಗಳಿಗೆ ತಿಳಿಸಲಾಗಿದೆ"
    });
    setWaterDialogOpen(false);
    setWaterIssueType("");
    setWaterIssueDetails("");
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const symptomsList = [
    { en: "Fever", hi: "बुखार", kn: "ಜ್ವರ", icon: "🤒" },
    { en: "Vomiting", hi: "उल्टी", kn: "ವಾಂತಿ", icon: "🤮" },
    { en: "Diarrhea", hi: "दस्त", kn: "ಅತಿಸಾರ", icon: "💩" },
    { en: "Headache", hi: "सिरदर्द", kn: "ತಲೆನೋವು", icon: "🤕" },
    { en: "Cough", hi: "खांसी", kn: "ಕೆಮ್ಮು", icon: "😮‍💨" },
    { en: "Body Pain", hi: "शरीर दर्द", kn: "ಮೈ ನೋವು", icon: "🦵" },
  ];

  const quickActions = [
    { icon: Thermometer, label: t.imSick, color: "bg-destructive", action: () => setSickDialogOpen(true) },
    { icon: Droplets, label: t.waterIssue, color: "bg-info", action: () => setWaterDialogOpen(true) },
    { icon: Phone, label: t.callAsha, color: "bg-success", action: () => window.location.href = "tel:+919876543210" },
    { icon: BookOpen, label: t.healthTips, color: "bg-warning", action: () => setTipsDialogOpen(true) },
    { icon: Hospital, label: t.nearbyHospital, color: "bg-secondary", action: () => setHospitalsDialogOpen(true) },
    { icon: AlertTriangle, label: t.emergency, color: "bg-destructive", action: () => window.location.href = "tel:112" },
  ];

  const renderHomeTab = () => (
    <div className="space-y-6">
      {/* Location & Weather */}
      <Card className="bg-gradient-to-br from-info/10 to-info/5 border-info/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-info" />
              <span className="font-medium">Avalahalli, Yelahanka New Town</span>
            </div>
            <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
              <SelectTrigger className="w-28 h-8">
                <Languages className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Cloud className="w-8 h-8 text-info" />
              <div>
                <p className="text-lg font-bold">{weatherData.temp}</p>
                <p className="text-xs text-muted-foreground">{weatherData.condition}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Wind className="w-8 h-8 text-warning" />
              <div>
                <p className="text-lg font-bold">AQI {weatherData.aqi}</p>
                <p className="text-xs text-muted-foreground">{weatherData.aqiStatus}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Tip of the Day */}
      <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">{t.healthTip}</span>
          </div>
          <p className="font-medium">{tips[0].tip}</p>
        </CardContent>
      </Card>

      {/* Alert Banner */}
      <Card className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground border-0">
        <CardContent className="p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
          <div className="flex-1">
            <p className="font-medium text-sm">
              {language === "en" ? "Health Alert" : language === "hi" ? "स्वास्थ्य चेतावनी" : "ಆರೋಗ್ಯ ಎಚ್ಚರಿಕೆ"}
            </p>
            <p className="text-xs opacity-90">
              {language === "en" ? "Diarrhea cases in your area. Boil water before drinking!" 
               : language === "hi" ? "आपके क्षेत्र में दस्त के मामले। पानी उबालकर पिएं!" 
               : "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಅತಿಸಾರ ಪ್ರಕರಣಗಳು. ನೀರು ಕುದಿಸಿ ಕುಡಿಯಿರಿ!"}
            </p>
            <p className="text-xs mt-1 opacity-75">
              {language === "en" ? "💡 Tip: Use ORS if you have diarrhea" 
               : language === "hi" ? "💡 सुझाव: दस्त होने पर ORS का उपयोग करें" 
               : "💡 ಸಲಹೆ: ಅತಿಸಾರ ಇದ್ದರೆ ORS ಬಳಸಿ"}
            </p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">{t.whatDoYouNeed}</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-0.5"
              onClick={action.action}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto rounded-xl ${action.color} flex items-center justify-center mb-2`}>
                  <action.icon className="w-6 h-6 text-background" />
                </div>
                <p className="font-medium text-sm">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Health History */}
      <Card className="cursor-pointer hover:shadow-md" onClick={() => setHistoryDialogOpen(true)}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <History className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{t.myHealthHistory}</p>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "View your past checkups & records" 
               : language === "hi" ? "अपनी पिछली जांच और रिकॉर्ड देखें" 
               : "ನಿಮ್ಮ ಹಿಂದಿನ ತಪಾಸಣೆ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ"}
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </CardContent>
      </Card>

      {/* Water Quality Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Droplets className="w-5 h-5 text-info" />
            {t.waterQuality}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="font-medium text-success">{t.safe} ✅</span>
            </div>
            <span className="text-sm text-muted-foreground">{t.lastChecked}: 2 hours ago</span>
          </div>
        </CardContent>
      </Card>

      {/* Your ASHA Worker */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t.yourAshaWorker}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
              SD
            </div>
            <div className="flex-1">
              <p className="font-medium">Savitri Devi</p>
              <p className="text-sm text-muted-foreground">Avalahalli, Yelahanka</p>
            </div>
            <Button variant="success" size="sm" onClick={() => window.location.href = "tel:+919876543210"}>
              <Phone className="w-4 h-4 mr-1" />
              {t.call}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReportTab = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {language === "en" ? "Submit Health Report" : language === "hi" ? "स्वास्थ्य रिपोर्ट जमा करें" : "ಆರೋಗ್ಯ ವರದಿ ಸಲ್ಲಿಸಿ"}
      </h2>
      
      <Card className="cursor-pointer hover:shadow-md" onClick={() => setSickDialogOpen(true)}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{t.imSick}</p>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Report your symptoms" : language === "hi" ? "अपने लक्षण बताएं" : "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವರದಿ ಮಾಡಿ"}
            </p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-md" onClick={() => setWaterDialogOpen(true)}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-info" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{t.waterIssue}</p>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? "Report water quality problems" : language === "hi" ? "पानी की गुणवत्ता की समस्या बताएं" : "ನೀರಿನ ಗುಣಮಟ್ಟ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ"}
            </p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {language === "en" ? "Recent Reports" : language === "hi" ? "हाल की रिपोर्ट" : "ಇತ್ತೀಚಿನ ವರದಿಗಳು"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-sm">Fever Report</p>
              <p className="text-xs text-muted-foreground">Dec 10, 2025</p>
            </div>
            <Badge variant="success">Resolved</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="font-medium text-sm">Water Issue</p>
              <p className="text-xs text-muted-foreground">Nov 28, 2025</p>
            </div>
            <Badge variant="success">Fixed</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLearnTab = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        {language === "en" ? "Health Education" : language === "hi" ? "स्वास्थ्य शिक्षा" : "ಆರೋಗ್ಯ ಶಿಕ್ಷಣ"}
      </h2>
      
      {learnTopics.map((topic, index) => (
        <Card key={index} className="cursor-pointer hover:shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <topic.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {language === "en" ? topic.title : language === "hi" ? topic.titleHi : topic.titleKn}
              </p>
              <p className="text-sm text-muted-foreground">{topic.videos} videos</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}

      <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <GraduationCap className="w-6 h-6 text-warning" />
            <span className="font-medium">
              {language === "en" ? "Earn Health Points!" : language === "hi" ? "हेल्थ पॉइंट कमाएं!" : "ಆರೋಗ್ಯ ಅಂಕಗಳನ್ನು ಗಳಿಸಿ!"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? "Complete lessons to earn points" : language === "hi" ? "पाठ पूरा करके अंक कमाएं" : "ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಅಂಕಗಳನ್ನು ಗಳಿಸಿ"}
          </p>
          <p className="text-lg font-bold text-warning mt-2">⭐ 125 Points</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderSOSTab = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-destructive">
        {language === "en" ? "Emergency Services" : language === "hi" ? "आपातकालीन सेवाएं" : "ತುರ್ತು ಸೇವೆಗಳು"}
      </h2>
      
      <Card 
        className="bg-destructive text-destructive-foreground cursor-pointer hover:opacity-90"
        onClick={() => window.location.href = "tel:112"}
      >
        <CardContent className="p-6 text-center">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 animate-pulse" />
          <p className="text-xl font-bold">112</p>
          <p className="text-sm opacity-90">
            {language === "en" ? "Emergency Helpline" : language === "hi" ? "आपातकालीन हेल्पलाइन" : "ತುರ್ತು ಸಹಾಯವಾಣಿ"}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="cursor-pointer hover:shadow-md" onClick={() => window.location.href = "tel:108"}>
          <CardContent className="p-4 text-center">
            <Hospital className="w-8 h-8 mx-auto mb-2 text-destructive" />
            <p className="font-bold">108</p>
            <p className="text-xs text-muted-foreground">Ambulance</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md" onClick={() => window.location.href = "tel:100"}>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-info" />
            <p className="font-bold">100</p>
            <p className="text-xs text-muted-foreground">Police</p>
          </CardContent>
        </Card>
      </div>

      <Card className="cursor-pointer hover:shadow-md" onClick={() => window.location.href = "tel:+919876543210"}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-success" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{t.callAsha}</p>
            <p className="text-sm text-muted-foreground">Savitri Devi - 9876543210</p>
          </div>
          <Button variant="success" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-md" onClick={() => setHospitalsDialogOpen(true)}>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Navigation className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{t.nearbyHospital}</p>
            <p className="text-sm text-muted-foreground">PHC Yelahanka - 2.5 km</p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </CardContent>
      </Card>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-2xl mb-3">
            RK
          </div>
          <h3 className="font-semibold text-lg">Ramesh Kumar</h3>
          <p className="text-sm text-muted-foreground">Avalahalli, Yelahanka New Town</p>
          <p className="text-xs text-muted-foreground mt-1">+91 9876543211</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {language === "en" ? "Personal Details" : language === "hi" ? "व्यक्तिगत विवरण" : "ವೈಯಕ್ತಿಕ ವಿವರಗಳು"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age</span>
            <span className="font-medium">35 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Blood Group</span>
            <span className="font-medium">B+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Family Members</span>
            <span className="font-medium">4</span>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:shadow-md" onClick={() => setHistoryDialogOpen(true)}>
        <CardContent className="p-4 flex items-center gap-4">
          <History className="w-6 h-6 text-primary" />
          <div className="flex-1">
            <p className="font-medium">{t.myHealthHistory}</p>
            <p className="text-sm text-muted-foreground">3 records</p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </CardContent>
      </Card>

      <Button 
        variant="outline" 
        className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        onClick={() => navigate("/")}
      >
        <LogOut className="w-4 h-4 mr-2" />
        {language === "en" ? "Logout" : language === "hi" ? "लॉग आउट" : "ಲಾಗ್ ಔಟ್"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background/20 flex items-center justify-center relative">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold">{t.appName}</h1>
              <p className="text-xs opacity-80">{t.tagline}</p>
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
              <button 
                onClick={() => { setActiveTab("profile"); setMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted"
              >
                <User className="w-5 h-5" />
                <span>{t.profile}</span>
              </button>
              <button 
                onClick={() => navigate("/")}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-destructive"
              >
                <LogOut className="w-5 h-5" />
                <span>{language === "en" ? "Logout" : language === "hi" ? "लॉग आउट" : "ಲಾಗ್ ಔಟ್"}</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="p-4 pb-24">
        {activeTab === "home" && renderHomeTab()}
        {activeTab === "report" && renderReportTab()}
        {activeTab === "learn" && renderLearnTab()}
        {activeTab === "sos" && renderSOSTab()}
        {activeTab === "profile" && renderProfileTab()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t p-2 flex justify-around">
        {[
          { id: "home", icon: Heart, label: t.home },
          { id: "report", icon: Thermometer, label: t.report },
          { id: "learn", icon: BookOpen, label: t.learn },
          { id: "sos", icon: AlertTriangle, label: t.sos },
          { id: "profile", icon: User, label: t.profile },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* I'm Sick Dialog */}
      <Dialog open={sickDialogOpen} onOpenChange={setSickDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Report Health Issue" : language === "hi" ? "स्वास्थ्य समस्या रिपोर्ट करें" : "ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ"}
            </DialogTitle>
            <DialogDescription>
              {language === "en" ? "Select your symptoms" : language === "hi" ? "अपने लक्षण चुनें" : "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {symptomsList.map((symptom) => (
                <button
                  key={symptom.en}
                  onClick={() => toggleSymptom(symptom.en)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    symptoms.includes(symptom.en) 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{symptom.icon}</span>
                  <p className="text-sm mt-1">
                    {language === "en" ? symptom.en : language === "hi" ? symptom.hi : symptom.kn}
                  </p>
                </button>
              ))}
            </div>
            
            <div>
              <Label>{language === "en" ? "How many days?" : language === "hi" ? "कितने दिन?" : "ಎಷ್ಟು ದಿನಗಳು?"}</Label>
              <Select value={symptomDays} onValueChange={setSymptomDays}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, "5+"].map((day) => (
                    <SelectItem key={day} value={String(day)}>{day} {language === "en" ? "days" : language === "hi" ? "दिन" : "ದಿನಗಳು"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{language === "en" ? "Additional details" : language === "hi" ? "अतिरिक्त विवरण" : "ಹೆಚ್ಚುವರಿ ವಿವರಗಳು"}</Label>
              <Textarea 
                value={symptomDetails}
                onChange={(e) => setSymptomDetails(e.target.value)}
                placeholder={language === "en" ? "Describe your symptoms..." : language === "hi" ? "अपने लक्षण बताएं..." : "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ..."}
              />
            </div>

            <Button onClick={handleSickSubmit} className="w-full" variant="hero">
              {language === "en" ? "Submit Report" : language === "hi" ? "रिपोर्ट जमा करें" : "ವರದಿ ಸಲ್ಲಿಸಿ"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Water Issue Dialog */}
      <Dialog open={waterDialogOpen} onOpenChange={setWaterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Report Water Issue" : language === "hi" ? "पानी की समस्या रिपोर्ट करें" : "ನೀರಿನ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{language === "en" ? "Issue Type" : language === "hi" ? "समस्या का प्रकार" : "ಸಮಸ್ಯೆ ಪ್ರಕಾರ"}</Label>
              <Select value={waterIssueType} onValueChange={setWaterIssueType}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "en" ? "Select issue" : language === "hi" ? "समस्या चुनें" : "ಸಮಸ್ಯೆ ಆಯ್ಕೆಮಾಡಿ"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dirty">{language === "en" ? "Dirty/Muddy Water" : language === "hi" ? "गंदा पानी" : "ಕೊಳಕು ನೀರು"}</SelectItem>
                  <SelectItem value="smell">{language === "en" ? "Bad Smell" : language === "hi" ? "बदबू" : "ಕೆಟ್ಟ ವಾಸನೆ"}</SelectItem>
                  <SelectItem value="no-water">{language === "en" ? "No Water Supply" : language === "hi" ? "पानी नहीं आ रहा" : "ನೀರು ಪೂರೈಕೆ ಇಲ್ಲ"}</SelectItem>
                  <SelectItem value="contaminated">{language === "en" ? "Suspected Contamination" : language === "hi" ? "दूषित पानी" : "ಕಲುಷಿತ ಎಂದು ಶಂಕಿಸಲಾಗಿದೆ"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{language === "en" ? "Details" : language === "hi" ? "विवरण" : "ವಿವರಗಳು"}</Label>
              <Textarea 
                value={waterIssueDetails}
                onChange={(e) => setWaterIssueDetails(e.target.value)}
                placeholder={language === "en" ? "Describe the issue..." : language === "hi" ? "समस्या का वर्णन करें..." : "ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ..."}
              />
            </div>
            <Button onClick={handleWaterSubmit} className="w-full" variant="hero">
              {language === "en" ? "Report Issue" : language === "hi" ? "समस्या रिपोर्ट करें" : "ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hospitals Dialog */}
      <Dialog open={hospitalsDialogOpen} onOpenChange={setHospitalsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "en" ? "Nearby Hospitals" : language === "hi" ? "नजदीकी अस्पताल" : "ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {hospitals.map((hospital, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Hospital className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-xs text-muted-foreground">{hospital.type} • {hospital.distance}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.location.href = `tel:${hospital.phone}`}>
                    <Phone className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Health Tips Dialog */}
      <Dialog open={tipsDialogOpen} onOpenChange={setTipsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.healthTips}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-success" />
                  </div>
                  <p className="font-medium text-sm">{tip.tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Health History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.myHealthHistory}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {healthHistory.map((record, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{record.condition}</p>
                    <Badge variant={record.status === "Recovered" ? "success" : "secondary"}>
                      {record.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {record.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Stethoscope className="w-3 h-3" />
                      {record.doctor}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitizenPortal;