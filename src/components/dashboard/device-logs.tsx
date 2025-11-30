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

const getBadgeVariant = (level: string) => {
  if (level === "ERROR") return "destructive";
  if (level === "WARN") return "secondary";
  return "outline";
};

export default function DeviceLogs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">IoT Device Logs</CardTitle>
        <CardDescription>
          Historical logs from connected IoT devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[120px]">Level</TableHead>
                <TableHead className="w-[150px]">Device ID</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deviceLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {log.timestamp}
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
