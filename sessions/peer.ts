"use client";

import type Peer from "peerjs";

// @todo currently no error handling
export function createPeer(
  id: string,
  config?: RTCConfiguration
): Promise<Peer> {
  return new Promise<Peer>(async (resolve, reject) => {
    const peerjs = await import("peerjs");
    const peer = new peerjs.Peer(id, { config });

    peer.on("open", (id) => {
      console.log("Peer Open", id);
      resolve(peer);
    });
  });
}
