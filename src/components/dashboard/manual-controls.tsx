"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Sun, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ManualControls() {
  const { toast } = useToast();

  const controls = [
    {
      name: "Toggle Sprinkler",
      icon: Droplets,
      variant: "outline" as const,
      action: () =>
        toast({
          title: "Action Triggered",
          description: "Sprinkler has been toggled.",
        }),
    },
    {
      name: "Adjust Lights",
      icon: Sun,
      variant: "outline" as const,
      action: () =>
        toast({
          title: "Action Triggered",
          description: "Lights have been adjusted.",
        }),
    },
    {
      name: "Run Diagnostics",
      icon: ShieldCheck,
      variant: "default" as const,
      action: () =>
        toast({
          title: "Action Triggered",
          description: "Device diagnostics are running.",
        }),
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Manual Controls</CardTitle>
        <CardDescription>
          Directly control IoT device functions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 justify-around items-center h-full pb-4">
        {controls.map((control) => (
          <Button
            key={control.name}
            variant={control.variant}
            size="lg"
            className="w-full sm:w-auto flex-grow"
            onClick={control.action}
          >
            <control.icon className="mr-2 h-5 w-5" />
            {control.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
