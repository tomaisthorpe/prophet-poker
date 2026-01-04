import PlayerSessionPage from "@/container/PlayerSessionPage";
import { unstable_noStore as noStore } from "next/cache";

export default async function PlaySession(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  // Ensure this page is treated as dynamic
  // So that the envvar is read at runtime
  noStore();

  const peerConfig = process.env.RTC_CONFIG
    ? JSON.parse(process.env.RTC_CONFIG)
    : undefined;

  return <PlayerSessionPage sessionId={params.id} peerConfig={peerConfig} />;
}
