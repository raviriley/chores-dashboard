// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

type TaskDetails = {
  task: string;
  completed: boolean;
};

type WeekInput = {
  [week: string]: {
    [name: string]: TaskDetails;
  };
};

export type Week = {
  week_number: number;
  name: string;
  task: string;
  completed: boolean;
  current: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let file = "";
    try {
      file = await fs.readFile(
        process.cwd() + "/../parker-chores-bot/weeks.json",
        "utf8",
      );
    } catch (error: any) {
      // if no file is found, look for weeks.json in the current directory
      console.log(`\nweeks.json not found in parent directory: ${error}`);
      console.log("using weeks.json in json directory\n");
      try {
        file = await fs.readFile(process.cwd() + "/json/weeks.json", "utf8");
      } catch (error) {
        throw new Error(`weeks.json not found in json directory: ${error}`);
      }
    }

    const data: WeekInput = JSON.parse(file);

    // transform weeks.json into an array of Week objects
    const result = [];
    for (const [weekName, tasks] of Object.entries(data)) {
      const weekNumber = parseInt(weekName.split(" ")[1]);

      for (const [name, details] of Object.entries(tasks)) {
        const week: Week = {
          week_number: weekNumber,
          name: name,
          task: details.task,
          completed: details.completed,
          current: false,
        };
        result.push(week);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: `An unknown error occurred: ${error}` });
    }
  }
}
