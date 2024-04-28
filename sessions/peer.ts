"use client";

import type Peer from "peerjs";

// @todo currently no error handling
export function createHostPeer(id: string | undefined): Promise<Peer> {
  return new Promise<Peer>(async (resolve, reject) => {
    const peerjs = await import("peerjs");
    const peer = id ? new peerjs.Peer(id) : new peerjs.Peer();

    peer.on("open", (id) => {
      console.log("Peer Open", id);
      resolve(peer);
    });
  });
}

// @todo currently no error handling
export function createPlayerPeer(id: string | undefined): Promise<Peer> {
  return new Promise<Peer>(async (resolve, reject) => {
    const peerjs = await import("peerjs");

    const peer = id ? new peerjs.Peer(id) : new peerjs.Peer();

    peer.on("open", (id) => {
      console.log("Peer Open", id);
      resolve(peer);
    });
  });
}
