"use server";

import { generateDiseaseAlerts } from "@/ai/flows/generate-disease-alerts";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";

function initializeFirebaseAdmin() {
  // Initialize Firebase Admin SDK if not already initialized
  if (!getApps().length) {
    try {
      // Try initializing with service account from environment variables first
      if (process.env.FIREBASE_PRIVATE_KEY) {
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          }),
        });
      } else {
        // Fallback for local development using a service account file
        const serviceAccount = require("../../serviceAccountKey.json");
        initializeApp({
          credential: cert(serviceAccount),
        });
      }
    } catch (e) {
      console.error(
        "Failed to initialize Firebase Admin SDK. Ensure serviceAccountKey.json exists for local development or environment variables are set for production.",
        e
      );
      // Re-throw or handle the error as appropriate for your application
      throw new Error("Firebase Admin SDK initialization failed.");
    }
  }
}

export async function getDiseaseAlert() {
  try {
    initializeFirebaseAdmin(); // Ensure Firebase is initialized
    const db = getFirestore();

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
