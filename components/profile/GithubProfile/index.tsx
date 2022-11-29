import keyframes from "!!raw-loader!./keyframes.module.css";
import Image from "next/image";
import { FC } from "react";
import SvgWrapper from "../SvgWrapper";
import colors from "./colors";
import { getStyles } from "./styles";

type GithubProfileProps = {
  avatarUrl: string;
  name: string;
  bio: string;
  langDict: Record<string, number>;
};

type LangRatio = {
  lang: string;
  ratioOfTops: number;
  ratioOfTotal: number;
};

const _ = getStyles();

const GithubProfile: FC<GithubProfileProps> = ({
  avatarUrl,
  name,
  bio,
  langDict,
}) => {
  const { total, langList } = Object.keys(langDict).reduce(
    (prev, lang) => {
      prev.total += langDict[lang];
      prev.langList.push({ lang, size: langDict[lang] });
      return prev;
    },
    { total: 0, langList: [] as { lang: string; size: number }[] }
  );
  langList.sort((a, b) => b.size - a.size);
  const topN = 6;
  const topNTotal = langList
    .slice(0, topN)
    .reduce((sum, item) => sum + item.size, 0);
  const LangRatioList: LangRatio[] = langList.slice(0, topN).map((item) => ({
    lang: item.lang,
    ratioOfTops: item.size / topNTotal,
    ratioOfTotal: item.size / total,
  }));

  return (
    <SvgWrapper width={600} height={200}>
      <style type="text/css">{keyframes.toString()}</style>
      <div style={_.containerMain}>
        <div style={_.containerHeader}>Github</div>
        <div style={_.containerBody}>
          <Image
            src={avatarUrl}
            alt="avatar"
            style={_.avatarImg}
            width={112}
            height={112}
          />
          <div style={_.bodyInfo}>
            <div style={_.username}>{name}</div>
            <div style={_.bio}>{bio}</div>
          </div>
          <div style={_.bodyRight}>
            <div style={_.langsBar}>
              {LangRatioList.map((item, idx) => (
                <div
                  key={item.lang}
                  style={{
                    backgroundColor: colors[item.lang],
                    width: `${item.ratioOfTops * 100}%`,
                    height: "100%",
                    borderTopLeftRadius: idx === 0 ? "3px" : "0px",
                    borderBottomLeftRadius: idx === 0 ? "3px" : "0px",
                    borderTopRightRadius:
                      idx === LangRatioList.length - 1 ? "3px" : "0px",
                    borderBottomRightRadius:
                      idx === LangRatioList.length - 1 ? "3px" : "0px",
                  }}
                />
              ))}
            </div>

            <div style={_.containerBadges}>
              {LangRatioList.map((item) => (
                <div key={item.lang} style={_.containerBadge}>
                  <div
                    style={{
                      ..._.badge,
                      backgroundColor: colors[item.lang],
                    }}
                  ></div>
                  <span style={_.badgeText}>{item.lang}</span>
                  <span>{`${(item.ratioOfTotal * 100).toFixed(2)}%`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SvgWrapper>
  );
};

export default GithubProfile;
