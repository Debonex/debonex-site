import { NextApiHandler } from "next";
import { SearchParams } from "notion-types";

import { notionClient } from "lib/notion";

const search: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }

  const params = req.body as SearchParams;
  const searchResult = await notionClient.search(params);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, max-age=60, stale-while-revalidate=60"
  );
  res.status(200).json(searchResult);
};

export default search;
