import { Input } from "@nextui-org/react";
import React from "react";

interface TextInputProps {
    key?: string;
    type?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onEnterPress?: (e: any) => void;
    className?: string;
    value: string;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    key,
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
            <Input
                key={key}
                radius="sm"
                type={type}
                placeholder={placeholder}
                className="max-w-full"
                value={value}
                onChange={onChange}
                errorMessage={errorMessage}
                isInvalid={error}
                disabled={disabled}
            />
            {/* <input
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
                {error && (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                )}
            </div> */}
        </div>
    );
};

export default TextInput;
