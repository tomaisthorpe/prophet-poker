import Container from "@/components/Container";
import PageHeading from "@/components/PageHeading";

export type PageProps = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Page({
  title,
  subtitle,
  actions,
  children,
}: PageProps) {
  return (
    <>
      {title && (
        <PageHeading title={title} subtitle={subtitle} actions={actions} />
      )}
      <main className="flex-1 h-100 flex">
        <Container className="flex-1 flex flex-col">{children}</Container>
      </main>
    </>
  );
}
