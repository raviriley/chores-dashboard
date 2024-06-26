import type { NextApiRequest, NextApiResponse } from "next";
import { Week } from "./weeks";

const paid = {
  Ethan: 6.5,
  Jay: 0,
  Luca: 0,
  Michael: 0,
  Naman: 0,
  Nick: 0,
  Pavan: 1,
  Ravi: 0,
  Rohan: 2,
  Tim: 0,
};

const additionalStrikes = {
  Ethan: 0,
  Jay: -1,
  Luca: -1,
  Michael: -2,
  Naman: 0,
  Nick: -2,
  Pavan: 0,
  Ravi: -1,
  Rohan: 0, // trash
  Tim: -2,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // calculate the total number of not completed weeks per person, not including the current week
    const weeks: Week[] = req.body;
    // map of name to strike num
    const strikes = new Map<string, number>();
    weeks
      .filter((week) => !week.completed && !week.current)
      .forEach((week) => {
        const name = week.name;
        if (name && strikes.has(name)) {
          strikes.set(name, strikes.get(name)! + 1);
        } else {
          strikes.set(name, 1);
        }
      });

    // sort strikes by value
    const strikesArray = Array.from(strikes);
    strikesArray.sort((a, b) => b[1] - a[1]);

    const data = strikesArray.map((strike) => {
      const name = strike[0] as
        | "Ethan"
        | "Jay"
        | "Luca"
        | "Michael"
        | "Naman"
        | "Nick"
        | "Pavan"
        | "Ravi"
        | "Rohan"
        | "Tim";
      return {
        name: name,
        incompletes: strike[1],
        strikes: strike[1] - 1 + additionalStrikes[name],
        modifier: additionalStrikes[name],
        paid: paid[name],
        remaining: strike[1] - 1 - paid[name] + additionalStrikes[name],
      };
    });
    // sort data by strikes
    data.sort((a, b) => b.strikes - a.strikes);
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
}
