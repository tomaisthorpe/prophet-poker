"use client";

import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Page from "@/components/Page";
import SessionLink from "@/components/SessionLink";
import SetupForm from "@/components/SetupForm";
import StoryHeading from "@/components/StoryHeading";
import StoryResultReport from "@/components/StoryResultReport";
import Table from "@/components/Table";
import { useHostSession } from "@/sessions/host";

export default function HostSessionPage({
  peerConfig,
}: {
  peerConfig?: RTCConfiguration;
}) {
  const [
    session,
    createSession,
    endSession,
    revealCards,
    nextStory,
    kickPlayer,
  ] = useHostSession(peerConfig);

  if (!session) {
    return <SetupForm onCreateSession={createSession} />;
  }
  // @todo handle if this is missing
  const story = session.stories.find((s) => s.id === session.currentStory);

  const onClickEndSession = () => {
    if (confirm("Are you sure you want to end the session?")) {
      endSession();
    }
  };

  return (
    <Layout>
      <Page title={session.name} actions={<SessionLink id={session.id} />}>
        <StoryHeading story={story!} />

        <div className="flex-1">
          <Table
            story={story!}
            players={session.players}
            onKickPlayer={kickPlayer}
          >
            {!story!.revealed && (
              <Button as="a" onClick={revealCards}>
                Reveal Cards
              </Button>
            )}
          </Table>

          {story!.revealed && (
            <>
              <StoryResultReport story={story!} players={session.players} />
              <div className="text-center mt-8">
                <Button as="a" onClick={nextStory}>
                  Next Story
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="w-full py-8 text-center place-self-end items-center mx-auto flex flex-col">
          <Button as="a" danger onClick={onClickEndSession}>
            End Session
          </Button>
        </div>
      </Page>
    </Layout>
  );
}
