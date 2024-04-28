"use client";

import { useEffect, useState } from "react";
import { Session } from "./session";
import PlayerSession from "./player-session";

export interface Player {
  id: string;
  name?: string;
  kicked?: boolean;
}

export function usePlayer(): [Player | undefined, (player: Player) => void] {
  const [player, setPlayer] = useState<Player | undefined>();
  const updatePlayer = (player: Player) => {
    window.localStorage.setItem("player", JSON.stringify(player));
    setPlayer(player);
  };

  // Attempt to load player from local storage
  useEffect(() => {
    let player = window.localStorage.getItem("player");
    if (player) {
      setPlayer(JSON.parse(player));
    }
  }, []);

  return [player, updatePlayer];
}

export interface ConnectionStatus {
  status: "connecting" | "connected" | "disconnected";
}

export function usePlayerSession(
  player: Player | undefined,
  sessionId: string
): [Session | undefined, PlayerSession | undefined, ConnectionStatus] {
  const [session, setSession] = useState<Session | undefined>();
  const [playerSession, setPlayerSession] = useState<PlayerSession>();
  const [connection, setConnection] = useState<ConnectionStatus>({
    status: "connecting",
  });

  const updateSession = (session: Session) => {
    setSession({ ...session });
  };

  useEffect(() => {
    if (!player) return;

    const ps = new PlayerSession(
      player,
      sessionId,
      updateSession,
      setConnection
    );
    setPlayerSession(ps);
  }, [player, sessionId]);

  return [session, playerSession, connection];
}
