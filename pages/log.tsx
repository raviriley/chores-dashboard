import CodeLog from "@/components/code-log";

const log_lines = [
  "sent message to 1234567890",
  "sent message to 1234567890",
  "sent message to 1234567890 with id 7863541234",
];

export default function Logs() {
  return <CodeLog log_lines={log_lines} />;
}
