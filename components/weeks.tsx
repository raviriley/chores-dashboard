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

  const fetchData = async () => {
    const weeks = await getWeeks();
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
  };

  useEffect(() => {
    fetchData();

    // Calculate the number of milliseconds until midnight
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set a timeout to call fetchData once a day
    const timer = setTimeout(() => {
      fetchData();
      // Then set an interval to call it every 24 hours
      setInterval(fetchData, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <>
      <Card className="m-2">
        <CardHeader>
          <CardTitle>This and Last Week&apos;s Chores</CardTitle>
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
