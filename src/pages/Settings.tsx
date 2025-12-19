import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, User, Bell, Shield, Database, Palette,
  Globe, Key, Mail, Smartphone, Save
} from "lucide-react";

const Settings = () => {
  const [activeItem, setActiveItem] = useState("settings");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: true,
    outbreak: true,
    water: true,
    daily: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <div className="ml-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
            <Button variant="hero">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Settings */}
            <div className="col-span-2 space-y-6">
              {/* Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      DS
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Photo</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input defaultValue="Dr. Sharma" className="mt-1" />
                    </div>
                    <div>
                      <Label>Designation</Label>
                      <Input defaultValue="Chief Medical Officer" className="mt-1" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input defaultValue="dr.sharma@health.gov.in" className="mt-1" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input defaultValue="+91 9876543210" className="mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Email Alerts</p>
                          <p className="text-xs text-muted-foreground">Receive via email</p>
                        </div>
                      </div>
                      <Switch checked={notifications.email} onCheckedChange={(c) => setNotifications({...notifications, email: c})} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Push Notifications</p>
                          <p className="text-xs text-muted-foreground">Mobile app</p>
                        </div>
                      </div>
                      <Switch checked={notifications.push} onCheckedChange={(c) => setNotifications({...notifications, push: c})} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">SMS Alerts</p>
                          <p className="text-xs text-muted-foreground">Critical only</p>
                        </div>
                      </div>
                      <Switch checked={notifications.sms} onCheckedChange={(c) => setNotifications({...notifications, sms: c})} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <SettingsIcon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">Daily Digest</p>
                          <p className="text-xs text-muted-foreground">Summary report</p>
                        </div>
                      </div>
                      <Switch checked={notifications.daily} onCheckedChange={(c) => setNotifications({...notifications, daily: c})} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Enhanced security</p>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">2 devices logged in</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language & Region
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Language</Label>
                    <select className="w-full mt-1 p-2 rounded-lg border border-input bg-background">
                      <option>English</option>
                      <option>हिंदी (Hindi)</option>
                    </select>
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <select className="w-full mt-1 p-2 rounded-lg border border-input bg-background">
                      <option>IST (UTC+5:30)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Data & Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Storage Used</span>
                      <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[24%] bg-primary rounded-full" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Clear Cache</Button>
                  <Button variant="outline" className="w-full">Export Data</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    API Access
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Manage API keys for integrations</p>
                  <Button variant="outline" className="w-full">Generate API Key</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
