import * as react from "react";

type Serializable = string | object | number | boolean | bigint;

// svg component
declare module "*.svg" {
  const props: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export = props;
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    xmlns?: string;
  }
}
