interface TextInputProps {
  type?: string;
  placeHolder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  value?: string | number;
}

const TextInput: React.FC<TextInputProps> = ({
  type = "text",
  placeHolder,
  onChange,
  className,
  value,
}) => {
  return (
    <>
      <input
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={onChange}
        className={`w-full h-10 pl-3 pr-10 rounded border-2 border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500 ${className}`}
      />
    </>
  );
};

export default TextInput;
