"use client";

import PlayerSessionPage from "@/container/PlayerSessionPage";
import { usePlayer, usePlayerSession } from "@/sessions/player";
import SetupPlayerForm from "@/components/SetupPlayerForm";

export default function PlaySession({ params }: { params: { id: string } }) {
  const [player, setPlayer] = usePlayer();
  const [session, playerSession, connectionStatus] = usePlayerSession(
    player,
    params.id
  );

  if (!player) {
    return <SetupPlayerForm onUpdatePlayer={setPlayer} />;
  }

  if (!session) {
    return <p>Loading...</p>;
  }

  const onSelectCard = (card: string) => {
    playerSession?.selectCard(card);
  };

  return (
    <PlayerSessionPage
      player={player}
      session={session}
      connectionStatus={connectionStatus}
      onSelectCard={onSelectCard}
    />
  );
}
