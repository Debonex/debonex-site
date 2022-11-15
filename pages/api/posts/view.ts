import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const view = async (req: NextApiRequest, res: NextApiResponse) => {
  const post = `${req.body.category}/${req.body.fileName}`;
  const current = await prisma.view.upsert({
    create: {
      post,
      count: 1,
    },
    update: {
      count: {
        increment: 1,
      },
    },
    where: {
      post,
    },
  });
  res.status(200).json(current);
};

export default view;
