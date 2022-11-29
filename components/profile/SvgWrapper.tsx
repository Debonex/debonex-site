import { FC, SVGProps } from "react";

const SvgWrapper: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props}>
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">{props.children}</div>
      </foreignObject>
    </svg>
  );
};

export default SvgWrapper;
