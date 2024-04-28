"use client";

import SetupForm from "@/components/SetupForm";
import { useHostSession } from "@/sessions/host";
import HostSessionPage from "@/container/HostSessionPage";

export default function Host() {
  const [
    session,
    createSession,
    endSession,
    revealCards,
    nextStory,
    kickPlayer,
  ] = useHostSession();

  if (!session) {
    return <SetupForm onCreateSession={createSession} />;
  }

  return (
    <HostSessionPage
      session={session}
      onEndSession={endSession}
      onRevealCards={revealCards}
      onNextStory={nextStory}
      onKickPlayer={kickPlayer}
    />
  );
}
