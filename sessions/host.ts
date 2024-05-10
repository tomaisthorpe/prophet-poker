import { useEffect, useState } from "react";
import { Session } from "./session";
import { v4 as uuidv4 } from "uuid";
import HostSession from "./host-session";

export interface SessionConfig {
  name: string;
}

export function useHostSession(
  peerConfig?: RTCConfiguration
): [
  Session | null,
  (cfg: SessionConfig) => void,
  () => void,
  () => void,
  () => void,
  (playerId: string) => void
] {
  const [session, setSession] = useState<Session | null>(null);

  // Always update the stored session every time we change it
  const updateSession = (session: Session) => {
    window.localStorage.setItem("current-session", JSON.stringify(session));
    setSession({ ...session });
  };

  const [hostSession, setHostSession] = useState<HostSession>();
  useEffect(() => {
    if (hostSession || !session) return;

    const hs = new HostSession(session, updateSession, peerConfig);
    setHostSession(hs);
  }, [hostSession, session]);

  // Attempt to load existing session from local storage
  useEffect(() => {
    const existingSession = window.localStorage.getItem("current-session");
    if (existingSession) {
      const session = JSON.parse(existingSession) as Session;
      updateSession(session);
    }
  }, []);

  // Creates an empty new session
  const createSession = async (cfg: SessionConfig) => {
    updateSession({
      id: uuidv4(),
      name: cfg.name,
      players: [],
      currentStory: 1,
      stories: [
        {
          id: 1,
          name: "Story 1",
          playerChoices: [],
          revealed: false,
        },
      ],
    });
  };

  const endSession = () => {
    window.localStorage.removeItem("current-session");
    hostSession!.close();
    setSession(null);
  };

  const revealCards = () => {
    hostSession!.revealCards();
  };

  const nextStory = () => {
    hostSession!.nextStory();
  };

  const kickPlayer = (playerId: string) => {
    hostSession!.kickPlayer(playerId);
  };

  return [
    session,
    createSession,
    endSession,
    revealCards,
    nextStory,
    kickPlayer,
  ];
}
