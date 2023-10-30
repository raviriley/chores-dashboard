import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTable } from "@/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { Week } from "@/pages/api/weeks";
import { ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";

function getCompletedColor(completed: boolean, current: boolean) {
  if (completed) {
    return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
  } else if (current) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
  } else {
    return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
  }
}

const columns: ColumnDef<Week>[] = [
  {
    accessorKey: "week_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Week Number" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "task",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
  },
  {
    accessorKey: "completed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completed" />
    ),
    cell: ({ row }) => {
      const completed: boolean = row.getValue("completed");
      const current: boolean = row.original.current;
      return (
        <Badge className={getCompletedColor(completed, current)}>
          {completed ? "completed" : current ? "in progress" : "not completed"}
        </Badge>
      );
    },
  },
];

export default function WeeksDataTable({ data }: { data: Week[] }) {
  return (
    <>
      <DataTable columns={columns} data={data} />
    </>
  );
}
