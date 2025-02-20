import DashboardLayout from "@/components/dashboard-layout";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <HydrateClient>
        <DashboardLayout>{children}</DashboardLayout>
      </HydrateClient>
    </TRPCReactProvider>
  );
}
