import { Story } from "@/sessions/session";

export default function StoryHeading({ story }: { story: Story }) {
  return (
    <div className="text-center mb-8 mt-12">
      <h2 className="text-2xl font-bold ">{story.name}</h2>
    </div>
  );
}
