import { Week } from "@/pages/api/weeks";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

type Strike = {
  name:
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
  incompletes: number;
  strikes: number;
  modifier: number;
  paid: number;
  remaining: number;
};

async function getStrikes(weeks: Week[]) {
  const response = await fetch("api/strikes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(weeks),
  });
  const strikes = (await response.json()) as Strike[];
  return strikes;
}

export default function Strikes({ weeks }: { weeks: Week[] }) {
  const [strikes, setStrikes] = useState<Strike[]>([]);

  useEffect(() => {
    getStrikes(weeks).then((strikes) => {
      setStrikes(strikes);
    });
  }, [weeks]);

  const columns: ColumnDef<Strike>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: "incompletes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Failed Chores" />
      ),
    },
    {
      accessorKey: "strikes",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Strikes" />
      ),
    },
    {
      accessorKey: "modifier",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Modifier" />
      ),
    },
    {
      accessorKey: "paid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Paid" />
      ),
    },
    {
      accessorKey: "remaining",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remaining" />
      ),
    },
  ];

  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>Incomplete Chores</CardTitle>
        <CardDescription>everyone gets one free failed chore</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={strikes} />
      </CardContent>
    </Card>
  );
}
