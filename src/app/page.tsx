import { FirebaseClientProvider } from "@/firebase/client-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import HealthMetrics from "@/components/dashboard/health-metrics";
import LeafHealthChart from "@/components/dashboard/leaf-health-chart";
import DiseaseAlerts from "@/components/dashboard/disease-alerts";
import ManualControls from "@/components/dashboard/manual-controls";
import DeviceLogs from "@/components/dashboard/device-logs";

export default function DashboardPage() {
  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <Header />
          <main className="p-4 lg:p-6">
            <div
              id="dashboard"
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-20"
            >
              <div className="lg:col-span-3">
                <HealthMetrics />
              </div>
              <div id="health" className="lg:col-span-3 scroll-mt-20">
                <LeafHealthChart />
              </div>
              <div
                id="alerts"
                className="lg:col-span-3 xl:col-span-1 scroll-mt-20"
              >
                <DiseaseAlerts />
              </div>
              <div
                id="controls"
                className="lg:col-span-3 xl:col-span-2 scroll-mt-20"
              >
                <ManualControls />
              </div>
              <div id="logs" className="lg:col-span-3 scroll-mt-20">
                <DeviceLogs />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
