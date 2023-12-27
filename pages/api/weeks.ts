import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

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
        path.join(process.cwd(), "json", "weeks.json"),
        "utf8",
      );
    } catch (error: any) {
      // this file should always exist, so if it doesn't, throw an error
      throw new Error("json/weeks.json does not exist");
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
