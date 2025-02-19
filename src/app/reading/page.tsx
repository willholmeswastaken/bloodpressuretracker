import DashboardLayout from "@/components/dashboard-layout";
import BloodPressureDashboard from "@/components/blood-pressure-dashboard";

export default function Home() {
  return (
    <DashboardLayout>
      <BloodPressureDashboard />
    </DashboardLayout>
  );
}
