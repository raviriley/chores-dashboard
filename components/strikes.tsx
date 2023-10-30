import { Week } from "@/pages/api/weeks";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Strike = {
  name: string;
  strikes: number;
};

export default function Strikes({ weeks }: { weeks: Week[] }) {
  // calculate the total number of not completed weeks per person, not including the current week

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
    return {
      name: strike[0],
      strikes: strike[1],
    };
  });

  const columns: ColumnDef<Strike>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "strikes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Strikes" />
      ),
    },
  ];

  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>Strikes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
