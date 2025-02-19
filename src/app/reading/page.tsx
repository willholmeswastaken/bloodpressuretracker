import DashboardLayout from "@/components/dashboard-layout";
import BloodPressureDashboard from "@/components/blood-pressure-dashboard";
import { api, HydrateClient } from "@/trpc/server";

export default function Home() {
  void api.reading.getLatest.prefetch();
  return (
    <HydrateClient>
      <DashboardLayout>
        <BloodPressureDashboard />
      </DashboardLayout>
    </HydrateClient>
  );
}
