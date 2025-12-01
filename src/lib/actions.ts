"use server";

import { generateDiseaseAlerts } from "@/ai/flows/generate-disease-alerts";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
  // Check if environment variables are available
  if (process.env.FIREBASE_PRIVATE_KEY) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  } else {
    // This is for local development without env vars.
    // It uses the service account key from a local file.
    // Ensure you have this file and it's in .gitignore
    try {
      const serviceAccount = require("../../serviceAccountKey.json");
      initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (e) {
      console.error("Failed to initialize Firebase Admin SDK. Ensure serviceAccountKey.json exists for local development or environment variables are set for production.", e);
    }
  }
}

const db = getFirestore();

export async function getDiseaseAlert() {
  try {
    // Fetch latest leaf health data
    const healthSnapshot = await db
      .collection("leaf_health_data")
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();
    const latestHealthData = healthSnapshot.docs[0]?.data();

    if (!latestHealthData) {
      return { error: "No leaf health data found." };
    }

    // Fetch recent device logs
    const logsSnapshot = await db
      .collection("device_logs")
      .orderBy("timestamp", "desc")
      .limit(5)
      .get();
    const deviceLogs = logsSnapshot.docs.map((doc) => doc.data());

    const leafHealthDataString = `Current leaf health index is ${
      latestHealthData.healthScore
    }. Temperature: ${latestHealthData.temperature}°C, Humidity: ${
      latestHealthData.humidity
    }%, Soil Moisture: ${latestHealthData.soilMoisture}%.`;

    const historicalDeviceLogsString = deviceLogs
      .map(
        (log) =>
          `[${new Date(
            log.timestamp.seconds * 1000
          ).toISOString()}] ${log.level}: ${log.message}`
      )
      .join("\n");

    const result = await generateDiseaseAlerts({
      leafHealthData: leafHealthDataString,
      historicalDeviceLogs: historicalDeviceLogsString,
    });

    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unknown error occurred." };
  }
}
