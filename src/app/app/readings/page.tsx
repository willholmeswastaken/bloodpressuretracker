import { api } from "@/trpc/server";
import { ReadingsList } from "./_components/list";

export default async function ReadingsPage() {
  const readings = await api.reading.getLatest();
  return <ReadingsList latestReadings={readings} />;
}
