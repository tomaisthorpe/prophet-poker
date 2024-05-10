import HostSessionPage from "@/container/HostSessionPage";

export default function Host() {
  const peerConfig = process.env.RTC_CONFIG
    ? JSON.parse(process.env.RTC_CONFIG)
    : undefined;

  return <HostSessionPage peerConfig={peerConfig} />;
}
