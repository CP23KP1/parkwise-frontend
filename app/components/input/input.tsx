import React from "react";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEnterPress?: (e: any) => void;
  className?: string;
  value?: string | number;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeholder,
  onChange,
  onEnterPress,
  className,
  errorMessage,
  error,
  value,
  disabled = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress(e);
    }
  };

  return (
    <div className="">
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`w-full h-10 px-4 border rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 ${
          error ? "border-red-500" : ""
        } ${className}`}
      />
      <div className="mt-1 h-4">
        {error && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default TextInput;
