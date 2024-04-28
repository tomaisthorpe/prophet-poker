import clsx from "clsx";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={clsx("max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
