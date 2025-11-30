"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Bot, CheckCircle, Loader2 } from "lucide-react";
import { getDiseaseAlert } from "@/lib/actions";
import type { GenerateDiseaseAlertsOutput } from "@/ai/flows/generate-disease-alerts";
import { Badge } from "@/components/ui/badge";

export default function DiseaseAlerts() {
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState<GenerateDiseaseAlertsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = () => {
    startTransition(async () => {
      setError(null);
      setAlert(null);
      const result = await getDiseaseAlert();
      if (result.error) {
        setError(result.error);
      } else {
        setAlert(result.data);
      }
    });
  };

  const getSeverityVariant = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Bot className="h-6 w-6" />
          AI Disease Analysis
        </CardTitle>
        <CardDescription>
          Use AI to analyze health data for potential diseases.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPending && (
          <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">
              Analyzing plant data...
            </p>
          </div>
        )}
        {!isPending && alert && (
          <Alert
            variant={alert.severity === "high" ? "destructive" : "default"}
          >
            <AlertTriangle className="h-4 w-4" />
            <div className="flex justify-between items-start">
              <AlertTitle>{alert.alertMessage}</AlertTitle>
              <Badge variant={getSeverityVariant(alert.severity)} className="capitalize ml-2 shrink-0">
                {alert.severity}
              </Badge>
            </div>
            <AlertDescription className="mt-2">
              <strong className="text-foreground">Suggested Actions:</strong>
              <p className="mt-1">{alert.suggestedActions}</p>
            </AlertDescription>
          </Alert>
        )}
        {!isPending && !alert && !error && (
            <div className="flex flex-col items-center justify-center gap-4 text-center h-full border-dashed border-2 rounded-lg p-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-muted-foreground">
                    No active alerts. Run analysis to check for potential diseases.
                </p>
            </div>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Analysis Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAnalysis}
          disabled={isPending}
          className="w-full"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          Run Analysis
        </Button>
      </CardFooter>
    </Card>
  );
}
