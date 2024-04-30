import PlayerSessionPage from "@/container/PlayerSessionPage";

export default function PlaySession({ params }: { params: { id: string } }) {
  return <PlayerSessionPage sessionId={params.id} />;
}
