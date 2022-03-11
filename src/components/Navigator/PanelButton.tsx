import clsx from "clsx"
import { FunctionComponent, MouseEventHandler, useState } from "react"

type LineProps = {
  d: string
  strokeDasharray?: string | number
  strokeDashoffset?: string | number
}

const Line: FunctionComponent<LineProps> = (props) => {
  return (
    <path
      className="transition-all duration-300"
      d={props.d}
      strokeWidth={5.5}
      strokeLinecap="round"
      fill="none"
      stroke="currentColor"
      strokeDasharray={props.strokeDasharray}
      strokeDashoffset={props.strokeDashoffset}
    />
  )
}

type NavigatorMenuButtonProps = {
  active: boolean
  onClick: MouseEventHandler<SVGSVGElement> | undefined
}

const PanelButton: FunctionComponent<NavigatorMenuButtonProps> = (props) => {
  return (
    <svg
      className={clsx({
        "cursor-pointer transition-transform duration-300": true,
        "rotate-45": props.active
      })}
      viewBox="0 0 100 100"
      width="24"
      onClick={props.onClick}
    >
      <Line
        strokeDasharray="40 139"
        strokeDashoffset={props.active ? "-98px" : ""}
        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
      />
      <Line d="m 30,50 h 40" />
      <Line
        strokeDasharray="40 180"
        strokeDashoffset={props.active ? "-138px" : ""}
        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
      />
    </svg>
  )
}

export default PanelButton
