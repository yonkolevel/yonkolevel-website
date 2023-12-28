import * as React from 'react';

enum ButtonVariant {
  primary,
  secondary,
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const styles = {
  primary: 'bg-orange text-white',
  secondary: 'bg-blue1 text-white',
};

const Button: React.FunctionComponent<IButtonProps> = ({
  variant = 'primary',
  className,
  ...props
}) => {
  const baseClasses = 'btn rounded-full font-pixel border-none btn-wide';

  const variantClasses = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
