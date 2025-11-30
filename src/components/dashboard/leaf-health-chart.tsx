"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { healthChartData as initialData } from "@/lib/data";

const chartConfig = {
  healthIndex: {
    label: "Health Index",
    color: "hsl(var(--chart-1))",
  },
  threshold: {
    label: "Warning Threshold",
    color: "hsl(var(--chart-2))",
  },
};

export default function LeafHealthChart() {
  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const lastDataPoint = prevData[prevData.length - 1];
        const newTime = new Date(
          new Date(lastDataPoint.time).getTime() + 60000
        );
        const newHealthIndex = Math.max(
          0,
          Math.min(
            100,
            lastDataPoint.healthIndex + (Math.random() - 0.5) * 4
          )
        );

        const newDataPoint = {
          time: newTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          healthIndex: parseFloat(newHealthIndex.toFixed(1)),
          threshold: 70,
        };

        const updatedData = [...prevData, newDataPoint];
        // Keep the chart from getting too crowded
        if (updatedData.length > 20) {
          return updatedData.slice(1);
        }
        return updatedData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Leaf Health Over Time</CardTitle>
        <CardDescription>
          Real-time monitoring of the plant's health index.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            accessibilityLayer
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="healthIndex"
              type="monotone"
              stroke="var(--color-healthIndex)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="threshold"
              type="monotone"
              stroke="var(--color-threshold)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
