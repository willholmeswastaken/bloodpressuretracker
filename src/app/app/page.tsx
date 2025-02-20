import BloodPressureDashboard from "@/components/blood-pressure-dashboard";
import { api } from "@/trpc/server";

export default function DashboardPage() {
  void api.reading.getLatest.prefetch();
  return <BloodPressureDashboard />;
}
