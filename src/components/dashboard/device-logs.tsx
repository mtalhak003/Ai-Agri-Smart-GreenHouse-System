"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { deviceLogs } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type Log = typeof deviceLogs[0];
type SortKey = keyof Log;

const getBadgeVariant = (level: string) => {
  if (level === "ERROR") return "destructive";
  if (level === "WARN") return "secondary";
  return "outline";
};

export default function DeviceLogs() {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>({ key: "timestamp", direction: "desc" });

  const sortedLogs = [...deviceLogs].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: SortKey) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">IoT Device Logs</CardTitle>
        <CardDescription>
          Historical logs from connected IoT devices. Click headers to sort.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("timestamp")}
                    className="px-0"
                  >
                    Timestamp
                    <span className="ml-2">{getSortIndicator("timestamp")}</span>
                  </Button>
                </TableHead>
                <TableHead className="w-[120px]">
                   <Button
                    variant="ghost"
                    onClick={() => requestSort("level")}
                    className="px-0"
                  >
                    Level
                    <span className="ml-2">{getSortIndicator("level")}</span>
                  </Button>
                </TableHead>
                <TableHead className="w-[150px]">
                  <Button
                    variant="ghost"
                    onClick={() => requestSort("deviceId")}
                    className="px-0"
                  >
                    Device ID
                    <span className="ml-2">{getSortIndicator("deviceId")}</span>
                  </Button>
                </TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(log.level)}>{log.level}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.deviceId}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {log.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}