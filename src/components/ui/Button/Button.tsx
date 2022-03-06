interface IButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: Type;
  textColor?: string;
  textSize?: string;
  borderColor?: string;
  bgColor?: string;
  onHoverBgColor?: string;
  onHoverTextColor?: string;
  className?: string;
}

export enum Type {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

const Button = ({
  children,
  onClick,
  bgColor = "bg-white",
  borderColor = "border-green-500",
  disabled,
  textColor = "text-green-500",
  textSize = "text-lg",
  type = Type.BUTTON,
  onHoverBgColor = "bg-green-500",
  onHoverTextColor = "text-white",
  className,
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${bgColor} border ${borderColor} ${textColor} ${textSize} hover:${onHoverTextColor} hover:${onHoverBgColor} ${className} py-3 px-4 rounded-full shadow-md hover:shadow-xl `}
    >
      {children}
    </button>
  );
};

export default Button;
