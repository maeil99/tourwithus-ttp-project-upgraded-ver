interface IButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: Type;
  textColor?: string;
  onHoverBgColor?: string;
  onHoverTextColor?: string;
  className?: string;
}

export enum Type {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

const BareButton = ({
  children,
  onClick,
  disabled,
  textColor = "text-red-500",
  type = Type.BUTTON,
  onHoverBgColor = "bg-white",
  onHoverTextColor = "text-white",
  className,
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={` ${className} ${textColor} hover:${onHoverTextColor} hover:${onHoverBgColor}  py-3 px-4 `}
    >
      {children}
    </button>
  );
};

export default BareButton;
