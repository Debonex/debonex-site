import config from "lib/config";
import { refresh } from "lib/notion";
import { NextApiHandler } from "next";

const refreshNotion: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "Method not allowed" });
  }
  if (req.body.password === config.password) {
    await refresh();
    res.status(200).json({ message: "success" });
  } else {
    return res.status(403).send({ error: "Authorization failed." });
  }
};

export default refreshNotion;
