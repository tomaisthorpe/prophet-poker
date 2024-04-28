import Input from "@/components/Input";

export default function SessionLink({ id }: { id: string }) {
  const loc = window.location;
  const url = `${loc.protocol}//${loc.host}/play/${id}`;
  return (
    <Input className="w-96" name="link" value={url} readOnly={true} muted />
  );
}
