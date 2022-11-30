export type PlayerStats = {
  count: number;
  level: { id: number; score: number; delta: number };
  max_level: { id: number; score: number; delta: number };
  rank_rates: number[];
  rank_avg_score: number[];
  avg_rank: number;
  negative_rate: number;
  id: number;
  nickname: string;
  played_modes: number[];
};

export type GameHistoryPlayer = {
  accountId: number;
  nickname: string;
  level: number;
  score: number;
  gradingScore: number;
};

export type GameHistory = {
  _id: string;
  modeId: number;
  uuid: string;
  startTime: number;
  endTime: number;
  players: GameHistoryPlayer[];
};

const API_URL_LIST = [
  "https://5-data.amae-koromo.com",
  "https://1.data.amae-koromo.com",
  "https://2.data.amae-koromo.com",
  "https://3.data.amae-koromo.com",
  "https://4.data.amae-koromo.com",
];

const apiUrl = (baseUrl: string, sanma: boolean) =>
  `${baseUrl}/api/v2/pl${sanma ? 3 : 4}`;

const mode = (sanma: boolean) =>
  sanma ? "21,22,23,24,25,26" : "8,9,11,12,15,16";

export const fetchPlayerStats = async (playerId: number, sanma: boolean) => {
  const fetchPlayerStatsImpl = async (baseUrl: string) => {
    return await fetch(
      `${apiUrl(
        baseUrl,
        sanma
      )}/player_stats/${playerId}/0/9999999999999?mode=${mode(sanma)}`
    );
  };

  const response = await Promise.any(
    API_URL_LIST.map((baseUrl) => fetchPlayerStatsImpl(baseUrl))
  );

  if (response.ok) {
    return (await response.json()) as PlayerStats;
  }

  return undefined;
};

export const fetchGameHistory = async (playerId: number, sanma: boolean) => {
  const fetchGameHistoryImpl = async (baseUrl: string) => {
    return await fetch(
      `${apiUrl(
        baseUrl,
        sanma
      )}/player_records/${playerId}/9999999999999/0?limit=10&mode=${mode(
        sanma
      )}&descending=true`
    );
  };

  const response = await Promise.any(
    API_URL_LIST.map((baseUrl) => fetchGameHistoryImpl(baseUrl))
  );

  if (response.ok) {
    return (await response.json()) as GameHistory[];
  }

  return undefined;
};
