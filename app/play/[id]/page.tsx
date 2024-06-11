import PlayerSessionPage from "@/container/PlayerSessionPage";
import { unstable_noStore as noStore } from "next/cache";

export default function PlaySession({ params }: { params: { id: string } }) {
  // Ensure this page is treated as dynamic
  // So that the envvar is read at runtime
  noStore();

  const peerConfig = process.env.RTC_CONFIG
    ? JSON.parse(process.env.RTC_CONFIG)
    : undefined;

  return <PlayerSessionPage sessionId={params.id} peerConfig={peerConfig} />;
}
