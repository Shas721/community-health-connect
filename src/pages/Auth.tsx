import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Users, Stethoscope, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"role" | "login">("role");
  const [role, setRole] = useState<"citizen" | "asha" | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleRoleSelect = (selectedRole: "citizen" | "asha") => {
    setRole(selectedRole);
    setStep("login");
  };

  const handleSendOTP = () => {
    if (phone.length < 10) {
      toast({ title: "Invalid phone number", variant: "destructive" });
      return;
    }
    setOtpSent(true);
    toast({ title: "OTP Sent", description: "Demo: Use 123456 as OTP" });
  };

  const handleLogin = () => {
    if (otp === "123456") {
      toast({ title: "Login Successful", description: `Welcome, ${role === "asha" ? "ASHA Worker" : "Citizen"}!` });
      if (role === "citizen") {
        navigate("/citizen");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast({ title: "Invalid OTP", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sidebar via-primary/20 to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow mb-4">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Swasthya Rakshak</h1>
          <p className="text-muted-foreground mt-1">Community Health Guardian</p>
        </div>

        {step === "role" ? (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-center text-foreground mb-6">Select Your Role</h2>
            
            <Card 
              className="cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => handleRoleSelect("asha")}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">ASHA Worker</h3>
                  <p className="text-sm text-muted-foreground">Healthcare professional portal</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:border-secondary/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => handleRoleSelect("citizen")}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-success flex items-center justify-center">
                  <Users className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Citizen / Villager</h3>
                  <p className="text-sm text-muted-foreground">Access health services & tips</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              🇮🇳 Government of India Initiative
            </p>
          </div>
        ) : (
          <Card className="animate-scale-in">
            <CardContent className="p-8">
              <button 
                onClick={() => setStep("role")} 
                className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
              >
                ← Change Role
              </button>
              
              <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-muted/50">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === "asha" ? "bg-gradient-to-br from-primary to-secondary" : "bg-gradient-to-br from-secondary to-success"}`}>
                  {role === "asha" ? <Stethoscope className="w-6 h-6 text-primary-foreground" /> : <Users className="w-6 h-6 text-secondary-foreground" />}
                </div>
                <div>
                  <p className="font-medium">{role === "asha" ? "ASHA Worker" : "Citizen"} Login</p>
                  <p className="text-xs text-muted-foreground">Enter your mobile number</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Mobile Number</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value="+91" 
                      disabled 
                      className="w-16 text-center"
                    />
                    <Input 
                      id="phone"
                      placeholder="Enter 10 digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      className="flex-1"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <Button onClick={handleSendOTP} className="w-full" variant="hero">
                    Send OTP
                  </Button>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input 
                        id="otp"
                        placeholder="Enter 6 digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="mt-1 text-center text-2xl tracking-widest"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Demo: Use 123456</p>
                    </div>
                    <Button onClick={handleLogin} className="w-full" variant="hero">
                      Login
                    </Button>
                    <button 
                      onClick={() => setOtpSent(false)}
                      className="w-full text-sm text-primary hover:underline"
                    >
                      Resend OTP
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
