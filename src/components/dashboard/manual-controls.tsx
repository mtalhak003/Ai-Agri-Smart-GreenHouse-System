import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Sun, ShieldCheck } from "lucide-react";

const controls = [
  { name: "Toggle Sprinkler", icon: Droplets, variant: "outline" },
  { name: "Adjust Lights", icon: Sun, variant: "outline" },
  { name: "Run Diagnostics", icon: ShieldCheck, variant: "default" },
];

export default function ManualControls() {
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
            variant={control.variant as any}
            size="lg"
            className="w-full sm:w-auto flex-grow"
          >
            <control.icon className="mr-2 h-5 w-5" />
            {control.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
