import clsx from "clsx";

export type ButtonProps = {
  as?: "button" | "a";
  href?: string;
  children: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  danger?: boolean;
};

const buttonClassName =
  "cursor-pointer inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
export default function Button({
  as = "button",
  href,
  children,
  type,
  className,
  onClick,
  danger,
}: ButtonProps) {
  if (as === "a") {
    return (
      <a
        href={href}
        onClick={onClick}
        className={clsx(
          buttonClassName,
          {
            "bg-red-600 hover:bg-red-700 focus:ring-red-500": danger,
          },
          className
        )}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={clsx(buttonClassName, className)}>
      {children}
    </button>
  );
}
