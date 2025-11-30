"use server";

import { generateDiseaseAlerts } from "@/ai/flows/generate-disease-alerts";
import { deviceLogs, healthChartData } from "./data";

export async function getDiseaseAlert() {
  try {
    const leafHealthData = `Current leaf health index is ${
      healthChartData[healthChartData.length - 1].healthIndex
    }. Recent trend shows a slight decline.`;
    const historicalDeviceLogs = deviceLogs
      .slice(0, 5)
      .map((log) => `[${log.timestamp}] ${log.level}: ${log.message}`)
      .join("\n");

    const result = await generateDiseaseAlerts({
      leafHealthData,
      historicalDeviceLogs,
    });

    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
