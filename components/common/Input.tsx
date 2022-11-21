import clsx from "clsx";
import { FC, HTMLInputTypeAttribute, ReactNode } from "react";

export type InputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | ReadonlyArray<string> | number;
  onChange?: (value: string) => void;
  className?: string;
  prepend?: ReactNode;
};

const Input: FC<InputProps> = (props) => {
  return (
    <div
      className={clsx([
        "group relative flex items-center border-b border-black py-2",
        "after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:scale-x-0 after:bg-primary-main after:transition-transform after:duration-300 focus-within:after:scale-x-100",
        "dark:border-white",
        props.className,
      ])}
    >
      {props.prepend}
      <input
        className="flex-grow bg-transparent focus:outline-none"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Input;
