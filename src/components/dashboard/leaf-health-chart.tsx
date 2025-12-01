"use client";

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
import { useLeafHealthData } from "@/lib/firebase-data-hooks";

const chartConfig = {
  healthScore: {
    label: "Health Index",
    color: "hsl(var(--chart-1))",
  },
  threshold: {
    label: "Warning Threshold",
    color: "hsl(var(--chart-2))",
  },
};

export default function LeafHealthChart() {
  const { data: healthData, isLoading } = useLeafHealthData(20);

  const chartData = (healthData || [])
    .map((d) => ({
      time: d.timestamp
        ? new Date(d.timestamp.seconds * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
      healthScore: d.healthScore,
      threshold: 70, // Assuming a static threshold for now
    }))
    .reverse(); // reverse to show oldest data first

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Leaf Health Over Time</CardTitle>
        <CardDescription>
          Real-time monitoring of the plant's health index.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && !healthData ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            Loading chart data...
          </div>
        ) : (
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
                dataKey="healthScore"
                type="monotone"
                stroke="var(--color-healthScore)"
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
        )}
      </CardContent>
    </Card>
  );
}
