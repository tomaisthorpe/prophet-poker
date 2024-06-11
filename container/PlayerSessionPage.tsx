"use client";

import Layout from "@/components/Layout";
import Page from "@/components/Page";
import SessionLink from "@/components/SessionLink";
import Table from "@/components/Table";
import { usePlayer, usePlayerSession } from "@/sessions/player";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Deck from "@/components/Deck";
import StoryHeading from "@/components/StoryHeading";
import StoryResultReport from "@/components/StoryResultReport";
import SetupPlayerForm from "@/components/SetupPlayerForm";

export default function PlayerSessionPage({
  sessionId,
  peerConfig,
}: {
  sessionId: string;
  peerConfig?: RTCConfiguration;
}) {
  const [player, setPlayer] = usePlayer();
  const [session, playerSession, connectionStatus] = usePlayerSession(
    player,
    sessionId,
    peerConfig
  );

  if (!player) {
    return <SetupPlayerForm onUpdatePlayer={setPlayer} />;
  }

  if (!session) {
    return <div className="mt-12 text-lg text-center">Loading...</div>;
  }

  const onSelectCard = (card: string) => {
    playerSession?.selectCard(card);
  };

  const story = session.stories.find((s) => s.id === session.currentStory);

  let selectedCard: string | undefined;
  const sessionPlayer = story?.playerChoices.find((p) => p.id === player.id);
  if (sessionPlayer) {
    selectedCard = sessionPlayer.card;
  }

  return (
    <Layout>
      <Page title={session.name} actions={<SessionLink id={session.id} />}>
        {connectionStatus && connectionStatus.status === "disconnected" && (
          <div className="mt-2 rounded-md bg-red-50 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Connection lost, try refresh to reconnect.
                </h3>
              </div>
            </div>
          </div>
        )}
        <StoryHeading story={story!} />
        <div className="flex-1">
          <Table story={story!} players={session.players}>
            {!story?.revealed && "Choose your card..."}
          </Table>
          {story?.revealed && (
            <StoryResultReport story={story!} players={session.players} />
          )}
        </div>
        <Deck
          selectable={!story?.revealed}
          selectedCard={selectedCard}
          onChooseCard={onSelectCard!}
        />
      </Page>
    </Layout>
  );
}
