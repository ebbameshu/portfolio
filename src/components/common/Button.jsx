import "./Button.css";

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  const classes = [
    "portfolio-button",
    `portfolio-button--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href !== undefined && href !== null) {
    return (
      <a className={classes} href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;