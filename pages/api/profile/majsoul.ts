import { NextApiHandler } from "next";

const API_URL = "https://1.data.amae-koromo.com/api/v2";
const PL4_URL = `${API_URL}/pl4`;
const PL3_URL = `${API_URL}/pl3`;

const profile: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).send({ error: "Method not allowed" });
  }

  const response = await fetch(
    `${PL4_URL}/player_stats/${11341035}/0/9999999999999?mode=8,9,11,12,15,16`
  );

  if (response.ok) {
    const data = (await response.json()) as PlayerStats;
    return res.status(200).json(data);
  }

  return res.status(200).json({ a: 1 });
};

export default profile;
