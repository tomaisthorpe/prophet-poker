import clsx from "clsx";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  muted?: boolean;
}

export default function Input({
  label,
  name,
  type,
  required,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
  min,
  muted,
  ...props
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={clsx({
          "mt-1": label !== undefined,
        })}
      >
        <input
          type={type || "text"}
          name={name}
          className={clsx(
            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            {
              "bg-gray-100 text-gray-800": muted,
            }
          )}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          {...props}
        />
      </div>
    </div>
  );
}
