import { FunctionComponent } from "react"

type LoadingProps = {
  width: number | string
  height: number | string
  color?: string
}

const Loading: FunctionComponent<LoadingProps> = (props) => {
  return (
    <span className="animate-[delay-in_0.15s_forwards]">
      <svg
        className="animate-[spin_1.4s_linear_infinite]"
        viewBox="0 0 40 40"
        width={props.width}
        height={props.height}
      >
        <circle
          className="animate-[loading-circle_1.4s_ease-in-out_infinite]"
          cx={20}
          cy={20}
          r={18.2}
          stroke={props.color ?? "currentColor"}
          fill="none"
          strokeWidth={3.6}
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

export default Loading
