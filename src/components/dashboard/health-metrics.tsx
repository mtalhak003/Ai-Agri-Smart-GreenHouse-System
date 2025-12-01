"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";
import SoilMoistureIcon from "./soil-moisture-icon";
import { useLeafHealthData } from "@/lib/firebase-data-hooks";

export default function HealthMetrics() {
  const { data: healthData, isLoading } = useLeafHealthData(1);
  const latestData = healthData?.[0];

  const metrics = [
    {
      name: "Temperature",
      value: latestData?.temperature ?? 0,
      unit: "°C",
      Icon: Thermometer,
    },
    {
      name: "Humidity",
      value: latestData?.humidity ?? 0,
      unit: "%",
      Icon: Droplets,
    },
    {
      name: "Soil Moisture",
      value: latestData?.soilMoisture ?? 0,
      unit: "%",
      Icon: SoilMoistureIcon,
    },
  ];

  if (isLoading && !latestData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
              <metric.Icon className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Loading...</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.name}
            </CardTitle>
            <metric.Icon className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tighter">
                {metric.value.toFixed(1)}
              </span>
              <span className="text-lg font-medium text-muted-foreground">
                {metric.unit}
              </span>
              <div className="ml-auto flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export { SoilMoistureIcon };
