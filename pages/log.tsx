import CodeLog from "@/components/code-log";
import { useEffect, useState } from "react";

async function getLogs() {
  const response = await fetch("api/logs");
  if (!response.ok) {
    console.log("Failed to fetch logs");
    return [] as string[]
  }
  const logs = (await response.json()) as string[];
  return logs || [] as string[];
}

export default function Logs() {
  const [logs, setLogs] = useState<string[]>([]); // Initialized with an empty array

  useEffect(() => {
    getLogs().then((logs) => {
      setLogs(logs);
    });
  }, []); // Empty dependency array means it runs once when the component mounts

  return <CodeLog log_lines={logs} />;
}
