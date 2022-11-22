type PlayerStats = {
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
