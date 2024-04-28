"use client";

import { Player } from "@/sessions/player";
import Card from "./Card";
import { Story } from "@/sessions/session";
import {
  TCanvasConfettiAnimationOptions,
  TConductorInstance,
} from "react-canvas-confetti/dist/types";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useEffect, useRef, useState } from "react";

export default function Table({
  players,
  children,
  story,
  onKickPlayer,
}: {
  story: Story;
  players: Player[];
  children?: React.ReactNode;
  onKickPlayer?: (playerId: string) => void;
}) {
  const activePlayers = players.filter((p) => p.kicked !== true);
  const evenPlayers = activePlayers.filter(
    (_: Player, i: number) => i % 2 === 0
  );
  const oddPlayers = activePlayers.filter(
    (_: Player, i: number) => i % 2 !== 0
  );

  const container = useRef<HTMLDivElement>(null);
  const [conductor, setConductor] = useState<TConductorInstance>();

  useEffect(() => {
    if (story.revealed) {
      conductor?.shoot();
    }
  }, [story.revealed]);

  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor);
  };

  const decorateOptions = (options: TCanvasConfettiAnimationOptions) => {
    const y = container.current!.offsetTop / window.innerHeight;
    return {
      ...options,
      origin: {
        x: 0.5,
        y: y,
      },
    };
  };

  return (
    <div className="w-full mx-auto my-auto">
      <PlayerRow
        players={oddPlayers}
        story={story}
        onKickPlayer={onKickPlayer}
      />
      <div
        ref={container}
        className="bg-blue-100 rounded-lg w-96 mx-auto h-36 flex items-center justify-center text-gray-600"
      >
        <Realistic onInit={onInit} decorateOptions={decorateOptions} />
        {children}
      </div>
      <PlayerRow
        players={evenPlayers}
        story={story}
        onKickPlayer={onKickPlayer}
      />
      {evenPlayers.length === 0 && (
        <p className="text-center mt-2">Waiting for players...</p>
      )}
    </div>
  );
}

function PlayerRow({
  players,
  story,
  onKickPlayer,
}: {
  players: Player[];
  story: Story;
  onKickPlayer?: (playerId: string) => void;
}) {
  return (
    <div className="flex justify-center">
      {players.map((player) => (
        <div
          className="group relative my-4 mx-6 text-center text-gray-800 w-24 flex flex-col items-center"
          key={player.id}
        >
          <Card
            hidden={!story.revealed}
            card={story.playerChoices.find((p) => p.id === player.id)?.card}
          />
          {player ? player.name : "..."}
          {onKickPlayer && (
            <a
              onClick={() => onKickPlayer(player.id)}
              className="absolute bottom-8 cursor-pointer group-hover:block hidden text-sm text-gray-500 hover:text-gray-600"
            >
              Kick
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
