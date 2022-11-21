import clsx from "clsx";
import { FC } from "react";

type LoadingProps = {
  className?: string;
};

const Loading: FC<LoadingProps> = (props) => {
  return (
    <div className={clsx("animate-[delay-in_0.15s_forwards]", props.className)}>
      <svg
        className="h-[1em] w-[1em] animate-[spin_1.4s_linear_infinite]"
        viewBox="0 0 40 40"
      >
        <circle
          className="animate-[loading-circle_1.4s_ease-in-out_infinite]"
          cx={20}
          cy={20}
          r={18.2}
          stroke="currentColor"
          fill="none"
          strokeWidth={3.6}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default Loading;
