import HostSessionPage from "@/container/HostSessionPage";
import { unstable_noStore as noStore } from "next/cache";

export default function Host() {
  // Ensure this page is treated as dynamic
  // So that the envvar is read at runtime
  noStore();

  const peerConfig = process.env.RTC_CONFIG
    ? JSON.parse(process.env.RTC_CONFIG)
    : undefined;

  return <HostSessionPage peerConfig={peerConfig} />;
}
