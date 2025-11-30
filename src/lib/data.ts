import { Thermometer, Droplets } from "lucide-react";
import SoilMoistureIcon from "@/components/dashboard/soil-moisture-icon";

export const initialHealthMetrics = [
  { name: "Temperature", value: 24.2, unit: "°C", Icon: Thermometer },
  { name: "Humidity", value: 68, unit: "%", Icon: Droplets },
  { name: "Soil Moisture", value: 55, unit: "%", Icon: SoilMoistureIcon },
];

export const healthChartData = Array.from({ length: 10 }, (_, i) => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (10 - i) * 5);
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      healthIndex: parseFloat((85 + Math.random() * 10 - i * 0.5).toFixed(1)),
      threshold: 70
    };
});

export const deviceLogs = [
  { id: 1, timestamp: new Date(Date.now() - 2 * 60000).toISOString(), level: "INFO", deviceId: "TEMP-SENSOR-01", message: "Reading nominal: 24.2°C" },
  { id: 2, timestamp: new Date(Date.now() - 5 * 60000).toISOString(), level: "INFO", deviceId: "HUMID-SENSOR-01", message: "Reading nominal: 68%" },
  { id: 3, timestamp: new Date(Date.now() - 10 * 60000).toISOString(), level: "INFO", deviceId: "SPRINKLER-01", message: "Cycle completed: 30s duration" },
  { id: 4, timestamp: new Date(Date.now() - 12 * 60000).toISOString(), level: "WARN", deviceId: "SOIL-SENSOR-01", message: "Moisture level approaching lower bound: 55%" },
  { id: 5, timestamp: new Date(Date.now() - 25 * 60000).toISOString(), level: "INFO", deviceId: "LIGHT-CTRL-01", message: "Light intensity adjusted to 80%" },
  { id: 6, timestamp: new Date(Date.now() - 45 * 60000).toISOString(), level: "ERROR", deviceId: "TEMP-SENSOR-01", message: "Failed to read sensor. Connection timeout." },
  { id: 7, timestamp: new Date(Date.now() - 62 * 60000).toISOString(), level: "INFO", deviceId: "SYSTEM", message: "Daily health check completed successfully." },
];
