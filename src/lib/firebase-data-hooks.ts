'use client';

import { useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';

// Define TypeScript interfaces based on backend.json
export interface LeafHealthData {
  id: string;
  deviceId: string;
  timestamp: Timestamp;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightLevel: number;
  healthScore: number;
}

export interface DeviceLog {
  id: string;
  deviceId: string;
  timestamp: Timestamp;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

/**
 * Hook to fetch the latest leaf health data.
 * @param count - The number of latest records to fetch.
 */
export function useLeafHealthData(count: number) {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const leafHealthQuery = useMemoFirebase(() => {
    // Wait for user to be authenticated and firestore to be available
    if (!firestore || isUserLoading || !user) return null;
    return query(
      collection(firestore, 'leaf_health_data'),
      orderBy('timestamp', 'desc'),
      limit(count)
    );
  }, [firestore, count, user, isUserLoading]);

  return useCollection<LeafHealthData>(leafHealthQuery);
}

/**
 * Hook to fetch device logs.
 */
export function useDeviceLogs() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const deviceLogsQuery = useMemoFirebase(() => {
    // Wait for user to be authenticated and firestore to be available
    if (!firestore || isUserLoading || !user) return null;
    return query(
      collection(firestore, 'device_logs'),
      orderBy('timestamp', 'desc'),
      limit(50) // Fetch last 50 logs
    );
  }, [firestore, user, isUserLoading]);

  return useCollection<DeviceLog>(deviceLogsQuery);
}
