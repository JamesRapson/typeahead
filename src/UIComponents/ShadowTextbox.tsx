import "./ShadowTextbox.css";

export type ShadowTextboxProps = {
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onChange: (str: string) => void;
  text?: string;
  shadowText?: string;
  showSpinner?: boolean;
  placeHolderText?: string;
};

export const ShadowTextbox = ({
  onKeyDown,
  onFocus,
  onChange,
  text,
  shadowText,
  showSpinner = false,
  placeHolderText,
}: ShadowTextboxProps) => {
  return (
    <div className="shadowTextbox">
      {shadowText && (
        <input
          className="text shadowText"
          tabIndex={-1}
          type="text"
          value={shadowText || ""}
          readOnly={true}
          onChange={() => {}}
        ></input>
      )}
      {showSpinner && (
        <img className="spinner" src="spinner.gif" alt="spinner" />
      )}
      <input
        type="text"
        className="text"
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        value={text || ""}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeHolderText}
      ></input>
    </div>
  );
};
