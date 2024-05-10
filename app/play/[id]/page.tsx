import PlayerSessionPage from "@/container/PlayerSessionPage";

export default function PlaySession({ params }: { params: { id: string } }) {
  const peerConfig = process.env.RTC_CONFIG
    ? JSON.parse(process.env.RTC_CONFIG)
    : undefined;

  return <PlayerSessionPage sessionId={params.id} peerConfig={peerConfig} />;
}
