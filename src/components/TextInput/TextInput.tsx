import { InputTextarea } from "primereact/inputtextarea";
import { FC } from "react";
import "./TextInput.css";

export interface TextInputProps {
  label: string;
  disabled?: boolean;
  utilityButton?: React.ReactNode;
  placeholder: string;
  ariaLabel: string;
  rows: number;
  value: string;
  onChange: (event: any) => void;
}

const TextInput: FC<TextInputProps> = ({
  label,
  utilityButton,
  disabled,
  placeholder,
  ariaLabel,
  value,
  onChange,
  rows,
}) => {
  return (
    <div className="textElement">
      <div className={`label ${utilityButton && "utility-button"}`}>
        <label className="label">{label}</label>
        {utilityButton}
      </div>
      <InputTextarea
        disabled={disabled}
        className="textArea"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        rows={rows}
        onChange={onChange}
      ></InputTextarea>
    </div>
  );
};

export default TextInput;
