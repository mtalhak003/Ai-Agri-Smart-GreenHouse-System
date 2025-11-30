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
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <Header />
        <main className="p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <HealthMetrics />
            </div>
            <div className="lg:col-span-3">
              <LeafHealthChart />
            </div>
            <div className="lg:col-span-3 xl:col-span-1">
              <DiseaseAlerts />
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
              <ManualControls />
            </div>
            <div className="lg:col-span-3">
              <DeviceLogs />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
