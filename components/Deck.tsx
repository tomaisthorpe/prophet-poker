import Card from "./Card";

const cards = [
  ["XS", "1-2 days"],
  ["S", "1 week"],
  ["M", "2 weeks"],
  ["L", "1 month"],
  ["XL", "2+ months"],
];

export default function Deck({
  selectedCard,
  onChooseCard,
  selectable,
}: {
  selectedCard?: string;
  onChooseCard: (card: string) => void;
  selectable?: boolean;
}) {
  return (
    <div className="w-full py-8 text-center place-self-end items-center mx-auto flex flex-col">
      {selectable && <div className="mb-2">Choose your card...</div>}
      <div className="flex">
        {cards.map((card) => (
          <Card
            card={card[0]}
            tooltip={card[1]}
            selected={card[0] === selectedCard}
            key={card[0]}
            onClick={(card) => onChooseCard(card)}
          />
        ))}
      </div>
    </div>
  );
}
