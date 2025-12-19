import { AlertTriangle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AlertBannerProps {
  title: string;
  message: string;
  severity: "critical" | "high" | "medium";
  onDismiss?: () => void;
  onAction?: () => void;
}

const severityStyles = {
  critical: "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground border-destructive/50",
  high: "bg-gradient-to-r from-warning to-warning/80 text-warning-foreground border-warning/50",
  medium: "bg-gradient-to-r from-info to-info/80 text-info-foreground border-info/50",
};

export function AlertBanner({ title, message, severity, onDismiss, onAction }: AlertBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={`alert-banner ${severityStyles[severity]} flex items-center justify-between gap-4`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-inherit hover:bg-background/20"
          onClick={onAction}
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-inherit hover:bg-background/20"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
