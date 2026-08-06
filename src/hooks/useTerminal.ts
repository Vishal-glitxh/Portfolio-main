import { useState, useMemo } from "react";

export const useTerminal = <T extends { severity: string }>(logs: T[] | undefined) => {
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  const filteredLogs = useMemo(() => {
    if (!logs) return [];
    if (selectedLevel === "ALL") return logs;
    return logs.filter(log => log.severity === selectedLevel);
  }, [logs, selectedLevel]);

  return { selectedLevel, setSelectedLevel, filteredLogs };
};
