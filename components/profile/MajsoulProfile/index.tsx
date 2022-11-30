import keyframes from "!!raw-loader!./keyframes.module.css";
import * as echarts from "echarts";
import { GameHistory, PlayerStats } from "lib/profile/majsoul";
import Image from "next/image";
import { FC } from "react";
import SvgWrapper from "../SvgWrapper";
import { getStyles } from "./styles";

type MajsoulProfileProps = {
  playerStats: PlayerStats;
  gameHistory: GameHistory[];
  levelImage: string;
};

const _ = getStyles();

const MajsoulProfile: FC<MajsoulProfileProps> = ({
  gameHistory,
  playerStats,
  levelImage,
}) => {
  const level = Math.floor(playerStats.level.id / 100);
  const isKonten = level % 10 >= 6;
  const subLevel = playerStats.level.id % 100;
  const nickname = playerStats.nickname;

  let point = playerStats.level.score + playerStats.level.delta;
  if (isKonten) {
    point /= 100;
  }

  const ranks: number[] = gameHistory.reverse().reduce((list, item) => {
    const idx = item.players.findIndex(
      (player) => player.nickname === nickname
    );
    const score = item.players[idx].score;
    let rank = 1;
    item.players
      .filter((player) => player.nickname !== nickname)
      .forEach((player, otherIdx) => {
        if (
          player.score > score ||
          (player.score === score && otherIdx < idx)
        ) {
          rank += 1;
        }
      });
    list.push(rank);
    return list;
  }, []);

  const chart = echarts.init(null, "dark", {
    renderer: "svg",
    ssr: true,
    width: 284,
    height: 128,
  });

  chart.setOption({
    xAxis: { type: "category", show: false },
    grid: {
      containLabel: true,
      top: "8px",
      left: "0%",
      right: "0%",
      bottom: "0%",
    },
    yAxis: {
      type: "value",
      scale: true,
      interval: 1,
      inverse: true,
      axisLabel: { formatter: "{value}位" },
    },
    series: [{ data: ranks, type: "line", symbolSize: 8 }],
    backgroundColor: "transparent",
  });

  return (
    <SvgWrapper height={200} width={600}>
      <style type="text/css">{keyframes.toString()}</style>
      <div style={_.containerMain}>
        <div style={_.containerHeader}>Majsoul</div>
        <div style={_.containerBody}>
          <Image
            src={levelImage}
            alt="level"
            style={_.levelImage}
            height={112}
            width={112}
          />
          <div style={_.bodyInfo}>
            <div style={_.nickname}>{nickname}</div>
            <div style={_.subLevel}>
              Lv.{subLevel} {point}
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: chart.renderToSVGString() }}
          />
        </div>
      </div>
    </SvgWrapper>
  );
};

export default MajsoulProfile;
