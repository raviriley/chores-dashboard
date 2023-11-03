import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // get chores_log.txt file
    const file = await fs.readFile(
      process.cwd() + "/../parker-chores-bot/chores_log.txt",
      "utf8",
    );
    // read text content of chores_log.txt
    let data = file.split("\n");
    // return text content of chores_log.txt
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
}
