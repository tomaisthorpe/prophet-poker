import clsx from "clsx";

export default function Card({
  card,
  onClick,
  selected,
  hidden,
  tooltip,
}: {
  card?: string;
  selected?: boolean;
  onClick?: (card: string) => void;
  hidden?: boolean;
  tooltip?: string;
}) {
  return (
    <div
      onClick={onClick && card ? () => onClick(card) : undefined}
      title={tooltip}
      className={clsx(
        "w-16 h-24 rounded-lg flex justify-center items-center text-xl mx-2",
        {
          "bg-white text-blue-300 border border-blue-300": card,
          "bg-gray-200": !card,
          "font-bold text-blue-500 border-blue-500 border-2": selected,
          "hover:bg-blue-50 cursor-pointer": onClick && card,
          "!bg-blue-200": card && hidden,
        }
      )}
    >
      {!hidden && card}
    </div>
  );
}
