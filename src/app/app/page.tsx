import BloodPressureDashboard from "@/components/blood-pressure-dashboard";
import { api } from "@/trpc/server";

export default async function DashboardPage() {
  const latestReadings = await api.reading.getLatest();

  return <BloodPressureDashboard latestReadings={latestReadings} />;
}
