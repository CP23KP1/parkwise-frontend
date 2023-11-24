interface TextInputProps {
  type?: string;
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onEnterPress?: (e:any) => void;
  className?: string;
  value?: string | number;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeHolder,
  onChange,
  onEnterPress,
  className,
  value,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnterPress) {
      onEnterPress(e);
    }
  };
  return (
    <>
      <input
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={`w-full h-10 pl-3 pr-10 rounded border-2 border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500 ${className}`}
      />
    </>
  );
};

export default TextInput;
