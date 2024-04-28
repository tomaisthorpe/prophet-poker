"use client";

import { Player } from "@/sessions/player";
import { Story } from "@/sessions/session";
import { BarChart } from "@mui/x-charts";

const options = ["?", "XS", "S", "M", "L", "XL"];

export default function StoryResultReport({
  story,
  players,
}: {
  story: Story;
  players: Player[];
}) {
  const counts = [0, 0, 0, 0, 0, 0];
  const activePlayers = players.filter((player) => !player.kicked);

  activePlayers.forEach((player) => {
    const choice = story.playerChoices.find(
      (choice) => choice.id === player.id
    );
    if (!choice) {
      counts[0]++;
    } else {
      const index = options.indexOf(choice.card);
      counts[index]++;
    }
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <BarChart
        series={[
          {
            data: counts,
            color: "rgb(191, 219, 254)",
            valueFormatter: (v) => {
              console.log(v);
              return `${v} - ${((v / activePlayers.length) * 100).toFixed(0)}%`;
            },
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: options,
          },
        ]}
        height={200}
        width={300}
        leftAxis={null}
        margin={{ left: 10, right: 10, top: 40, bottom: 30 }}
      />
    </div>
  );
}
