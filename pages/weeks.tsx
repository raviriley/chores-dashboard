import { Badge } from "@/components/ui/badge";
import WeeksDataTable from "@/components/weeks-data-table";
import { Week } from "@/pages/api/weeks";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getWeeks() {
  const response = await fetch("api/weeks");
  if (!response.ok) {
    console.log("Failed to fetch weeks");
    return [] as Week[];
  }
  const weeks = (await response.json()) as Week[];

  return weeks;
}

export default function Weeks() {
  const [data, setData] = useState<Week[]>([]); // Initialized with an empty array

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
          <CardTitle>All Weeks</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeksDataTable data={data} />
        </CardContent>
      </Card>
    </>
  );
}
