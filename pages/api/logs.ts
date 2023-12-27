import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // get chores_log.txt file
    let file = "";
    try {
      file = await fs.readFile(
        process.cwd() + "/../parker-chores-bot/chores_log.txt",
        "utf8",
      );
    } catch (error) {
      // if no file is found, look for chores_log.txt in this repo's data directory
      console.log(`\nchores_log.txt not found in chores bot repo: ${error}`);
      try {
        console.log("using chores_log.txt in /data directory\n");
        file = await fs.readFile(
          path.join(process.cwd(), "data", "chores_log.txt"),
          "utf8",
        );
      } catch (error) {
        throw new Error(`chores_log.txt not found in data directory: ${error}`);
      }
    }

    // read text content of chores_log.txt
    let data = file.split("\n");
    if (data.length === 1 && data[0] === "") {
      data = ["Log file is empty."];
    }
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
