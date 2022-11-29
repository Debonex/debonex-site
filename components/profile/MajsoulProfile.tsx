import * as echarts from "echarts";
import { FC } from "react";

const chart = echarts.init(null, null, {
  renderer: "svg",
  ssr: true,
  width: 400,
  height: 300,
});

const MajsoulProfile: FC = () => {
  chart.setOption({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  });

  return (
    <svg
      width="400"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: chart.renderToSVGString() }}
    ></svg>
  );
};

export default MajsoulProfile;
