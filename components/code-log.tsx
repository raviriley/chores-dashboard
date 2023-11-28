import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type CodeLogProps = {
  log_lines: string[];
};

export default function CodeLog({ log_lines }: CodeLogProps) {
  if (!log_lines) {
    log_lines = ["No logs found"];
  }
  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>Chores Bot Logs</CardTitle>
        <CardDescription>logs from Tim&apos;s Rasberry Pi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="rounded-md bg-black p-6">
            <pre>
              <code className="grid gap-1 text-sm text-muted-foreground [&_span]:h-4">
                {log_lines.map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={"/api/logs"}
          className={buttonVariants({ variant: "outline" })}
        >
          View raw txt file
        </Link>
      </CardFooter>
    </Card>
  );
}
