import Loading from "components/common/Loading";
import { FC, MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = ({ loading, className, children, onClick }) => {
  const handleClick = (e) => {
    if (!loading) {
      onClick(e);
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {loading ? <Loading className="inline-flex" /> : children}
    </button>
  );
};

export default Button;
