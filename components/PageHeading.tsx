import Container from "@/components/Container";

export type PageHeadingProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export default function PageHeading({
  title,
  subtitle,
  actions,
}: PageHeadingProps) {
  return (
    <header className="bg-white shadow">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
            {subtitle && (
              <span className="block sm:inline text-gray-500 text-xl sm:ml-2">
                {subtitle}
              </span>
            )}
          </h1>
          <div>{actions}</div>
        </div>
      </Container>
    </header>
  );
}
