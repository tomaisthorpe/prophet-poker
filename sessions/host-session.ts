"use client";
import type Peer from "peerjs";
import type { DataConnection } from "peerjs";
import { Session, Story } from "./session";
import { Player } from "./player";

export default class HostSession {
  private peer!: Peer;

  private connections: DataConnection[] = [];

  constructor(
    private session: Session,
    private setSession: (s: Session) => void
  ) {
    // Connect to PeerJS, ready for clients to connect
    this.connect();
  }

  private async connect() {
    const { createHostPeer } = await import("./peer");
    this.peer = await createHostPeer(this.session.id);
    // Setup the listeners for new connections
    this.peer.on("connection", this.onConnection.bind(this));

    setInterval(this.broadcast.bind(this), 1000);
  }

  private onMessage(c: DataConnection): (data: any) => void {
    return (data: any) => {
      switch (data.type) {
        case "player-join":
          this.session = upsertPlayer(this.session, data.player);
          break;

        case "select-card":
          this.session = selectCard(
            this.session,
            data.story,
            c.peer,
            data.card
          );

          break;
        default:
          break;
      }

      this.setSession(this.session);
      this.broadcast();
    };
  }

  private onConnection(c: DataConnection) {
    console.log(c);

    this.connections.push(c);

    c.on("data", this.onMessage(c).bind(this));

    c.on("close", () => {
      this.connections = this.connections.filter(
        (conn) => conn.peer !== c.peer
      );
    });

    this.session = upsertPlayer(this.session, { id: c.peer, kicked: false });
    this.setSession(this.session);
    this.broadcast();
  }

  private broadcast() {
    for (const c of this.connections) {
      c.send({ type: "session", session: this.session });
    }
  }

  public close() {
    for (const c of this.connections) {
      c.close();
    }

    this.peer.disconnect();
  }

  private currentStory(): Story | undefined {
    return this.session.stories.find((s) => s.id === this.session.currentStory);
  }

  public revealCards() {
    const story = this.currentStory();
    if (!story) return;
    story.revealed = true;

    this.setSession(this.session);
    this.broadcast();
  }

  public nextStory() {
    const story = this.currentStory();
    if (!story || !story.revealed) return;

    const newId = story.id + 1;
    this.session.stories.push({
      id: newId,
      name: `Story ${newId}`,
      playerChoices: [],
      revealed: false,
    });
    this.session.currentStory = newId;

    this.setSession(this.session);
    this.broadcast();
  }

  public kickPlayer(playerId: string) {
    this.session = kickPlayer(this.session, playerId);
    this.setSession(this.session);
    this.broadcast();
  }
}

function upsertPlayer(session: Session, player: Player): Session {
  const players = session.players;

  const existing = players.find((p) => p.id === player.id);
  if (existing) {
    existing.name = player.name;
    existing.kicked = false;
  } else {
    players.push(player);
  }

  return session;
}

function kickPlayer(session: Session, playerId: string): Session {
  const player = session.players.find((p) => p.id === playerId);
  if (player) {
    player.kicked = true;
  }

  return session;
}

function selectCard(
  session: Session,
  storyId: number,
  playerId: string,
  card: string
): Session {
  const story = session.stories.find((s) => s.id === storyId);
  if (!story) return session;

  if (story.revealed) return session;

  // Check if player has already voted
  const player = story.playerChoices.find((p) => p.id === playerId);
  if (player) {
    player.card = card;
  } else {
    story.playerChoices.push({ id: playerId, card });
  }

  return session;
}
