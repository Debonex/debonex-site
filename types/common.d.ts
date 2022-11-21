type Serializable = string | object | number | boolean | bigint;

// svg component
declare module "*.svg" {
  const props: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export = props;
}
