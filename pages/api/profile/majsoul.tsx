import MajsoulProfile from "components/profile/MajsoulProfile";
import Cache from "lib/cache";
import { fetchGameHistory, fetchPlayerStats } from "lib/profile/majsoul";
import absoluteUrl from "lib/utils/absoluteUrl";
import fetchBase64 from "lib/utils/fetchBase64";
import { NextApiHandler } from "next";
import { renderToString } from "react-dom/server";
import { getTheme } from "./common";

const cache = new Cache(".site-cache/majsoul");

const levelImages = {
  101: "sima_fish.png",
  102: "sima_queshi.png",
  103: "sima_quejie.png",
  104: "sima_quehao.png",
  105: "sima_quesheng.png",
  106: "sima_huntian.png",
  107: "sima_huntian.png",
  201: "sanma_fish.png",
  202: "sanma_queshi.png",
  203: "sanma_quejie.png",
  204: "sanma_quehao.png",
  205: "sanma_quesheng.png",
  206: "sanma_huntian.png",
  207: "sanma_huntian.png",
};

const profile: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  const id = req.query.id as string;
  const mode = req.query.mode as string;

  const theme = getTheme(req);

  if (!/^\d+$/.test(id)) {
    return res.status(400).send("Invalid player id.");
  }

  const playerId = Number(id);
  const sanma = mode === "3";

  const [playerStats, gameHistory] = await Promise.all([
    fetchPlayerStats(playerId, sanma),
    fetchGameHistory(playerId, sanma),
  ]);

  if (!playerStats || !gameHistory) {
    return res.status(500).send("Player not found.");
  }

  const level = Math.floor(playerStats.level.id / 100);
  const cacheBuffer = await cache.get(level.toString());
  const { origin } = absoluteUrl(req);

  let levelImage;
  if (!cacheBuffer) {
    levelImage = await fetchBase64(
      `${origin}/images/profile/${levelImages[level]}`
    );
    cache.put(level.toString(), levelImage);
  } else {
    levelImage = cacheBuffer.data.toString();
  }

  return res
    .status(200)
    .setHeader("Content-Type", "image/svg+xml")
    .end(
      renderToString(
        <MajsoulProfile
          gameHistory={gameHistory}
          playerStats={playerStats}
          levelImage={levelImage}
          theme={theme}
        />
      )
    );
};

export default profile;
