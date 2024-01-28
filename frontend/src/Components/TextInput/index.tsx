interface TextInputProps {
  label?: string;
  isPassword?: boolean;
  value: string;
  setValue: (val: string) => void;
}

const TextInput = ({ label, isPassword, value, setValue }: TextInputProps) => (
  <>
    {label && <label>{label}</label>}
    <input
      type={isPassword ? 'password' : undefined}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  </>
);

export default TextInput;
