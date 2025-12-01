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
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useDeviceLogs } from "@/lib/firebase-data-hooks";
import type { DeviceLog } from "@/lib/firebase-data-hooks";

type SortKey = keyof DeviceLog;

const getBadgeVariant = (level: string) => {
  if (level === "ERROR") return "destructive";
  if (level === "WARN") return "secondary";
  return "outline";
};

export default function DeviceLogs() {
  const { data: deviceLogs, isLoading } = useDeviceLogs();
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>({ key: "timestamp", direction: "desc" });

  const sortedLogs = [...(deviceLogs || [])].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let aValue = a[key];
    let bValue = b[key];

    if (key === "timestamp") {
      aValue = a.timestamp?.seconds || 0;
      bValue = b.timestamp?.seconds || 0;
    }

    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Loading logs...
                  </TableCell>
                </TableRow>
              ) : sortedLogs.length > 0 ? (
                sortedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {log.timestamp
                        ? new Date(
                            log.timestamp.seconds * 1000
                          ).toLocaleString()
                        : "No date"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(log.level)}>
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{log.deviceId}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.message}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
