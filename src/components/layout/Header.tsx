import { Bell, Mail, Search, User, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search villages, cases, ASHA workers..." 
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Refresh */}
        <Button variant="ghost" size="icon" className="relative">
          <RefreshCw className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                12
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="destructive" className="text-xs">12 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                <span className="font-medium text-sm">Outbreak Alert - Rampur</span>
              </div>
              <p className="text-xs text-muted-foreground ml-4">47 new diarrhea cases detected</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-warning" />
                <span className="font-medium text-sm">Water Contamination</span>
              </div>
              <p className="text-xs text-muted-foreground ml-4">Tube Well #23 marked unsafe</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-info" />
                <span className="font-medium text-sm">AI Prediction Update</span>
              </div>
              <p className="text-xs text-muted-foreground ml-4">New risk assessment available</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages */}
        <Button variant="ghost" size="icon" className="relative">
          <Mail className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-info text-info-foreground text-xs rounded-full flex items-center justify-center font-medium">
            5
          </span>
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-medium text-sm">
                DS
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">Dr. Sharma</p>
                <p className="text-xs text-muted-foreground">CMO, Sitapur</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
