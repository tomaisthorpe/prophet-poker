"use client";

import Peer, { DataConnection } from "peerjs";
import { createPeer } from "./peer";
import { Session } from "./session";
import { ConnectionStatus, Player } from "./player";

export default class PlayerSession {
  private peer!: Peer;
  private connection?: DataConnection;
  private session!: Session;

  constructor(
    private player: Player,
    sessionId: string,
    private setSession: (s: Session) => void,
    private setConnectionStatus: (s: ConnectionStatus) => void,
    peerConfig?: RTCConfiguration
  ) {
    // Connect to PeerJS, ready for connect to the client
    this.connect(sessionId, peerConfig);
  }

  private async connect(sessionId: string, peerConfig?: RTCConfiguration) {
    this.setConnectionStatus({ status: "connecting" });
    this.peer = await createPeer(this.player.id, peerConfig);

    this.connection = this.peer.connect(sessionId, { reliable: true });
    this.connection.on("open", () => {
      console.log("Connected to host");
      this.setConnectionStatus({ status: "connected" });
      this.connection?.send({ type: "player-join", player: this.player });
    });

    this.connection.on("data", this.onMessage.bind(this));

    this.connection.on("error", (e) => {
      console.log("error", e);
    });

    this.connection.on("close", () => {
      this.setConnectionStatus({ status: "disconnected" });
    });
  }

  private onMessage(data: any): void {
    console.log(data);
    switch (data.type) {
      case "session":
        this.session = data.session;
        break;

      default:
        break;
    }

    this.setSession(this.session);
  }

  // @todo currently just sets on the player
  public selectCard(card: string): void {
    // Set on current player
    const story = this.session.stories.find(
      (s) => s.id === this.session.currentStory
    );

    if (story?.revealed) return;

    if (story) {
      // Check if player has already voted
      const player = story.playerChoices.find((p) => p.id === this.player.id);
      if (player) {
        player.card = card;
      } else {
        story.playerChoices.push({ id: this.player.id, card });
      }
      this.setSession(this.session);
    }

    this.connection?.send({
      type: "select-card",
      card,
      story: this.session.currentStory,
    });
  }
}
