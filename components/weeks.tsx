import { Week } from "@/pages/api/weeks";
import { useState, useEffect } from "react";
import WeeksDataTable from "./weeks-data-table";
import Strikes from "./strikes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getWeeks() {
  const response = await fetch("api/weeks");
  const weeks = (await response.json()) as Week[];

  return weeks;
}

export default function Weeks() {
  const [data, setData] = useState<Week[]>([]); // Initialized with an empty array
  const [currentWeek, setCurrentWeek] = useState<number>(0);

  useEffect(() => {
    getWeeks().then((weeks) => {
      // find max week_number in weeks
      // set currentWeek to max week_number
      let maxWeekNumber = 0;
      weeks.forEach((week) => {
        if (week.week_number > maxWeekNumber) {
          maxWeekNumber = week.week_number;
        }
      });
      setCurrentWeek(maxWeekNumber);
      // mutate weeks
      weeks.forEach((week) => {
        if (week.week_number === maxWeekNumber) {
          week.current = true;
        } else {
          week.current = false;
        }
      });
      setData(weeks);
    });
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <>
      <Card className="m-2">
        <CardHeader>
          <CardTitle>This and Last Weeks</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeksDataTable
            data={data.filter((week) => week.week_number > currentWeek - 2)}
          />
        </CardContent>
      </Card>
      <Strikes weeks={data} />
    </>
  );
}
