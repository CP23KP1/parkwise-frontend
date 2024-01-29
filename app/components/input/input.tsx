import { Input } from "@nextui-org/react";
import React from "react";

interface TextInputProps {
    type?: string;
    label?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onEnterPress?: (e: any) => void;
    className?: string;
    value: string;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    isRequired?: boolean;
    startContent?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
    type = "text",
    label,
    placeholder,
    onChange,
    onEnterPress,
    className,
    errorMessage,
    error,
    value,
    disabled = false,
    isRequired = false,
    startContent,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnterPress) {
            onEnterPress(e);
        }
    };

    return (
        <div className="">
            <Input
                radius="sm"
                type={type}
                label={label}
                placeholder={placeholder}
                className="max-w-full"
                value={value}
                onChange={onChange}
                errorMessage={error ? errorMessage : undefined}
                isInvalid={error}
                disabled={disabled}
                isRequired={isRequired}
                startContent={startContent}
            />
        </div>
    );
};

export default TextInput;
