"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { initialHealthMetrics } from "@/lib/data";
import SoilMoistureIcon from "./soil-moisture-icon";


type Metric = {
  name: string;
  value: number;
  unit: string;
  Icon: React.ElementType;
};

export default function HealthMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>(initialHealthMetrics);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => ({
          ...metric,
          value: parseFloat(
            (metric.value + (Math.random() - 0.5) * 0.5).toFixed(1)
          ),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
                {metric.value}
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
