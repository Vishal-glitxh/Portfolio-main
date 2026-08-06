import { useState, useMemo } from "react";

export const useLocalSearch = <T,>(
  items: T[] | undefined,
  filterFn: (item: T, query: string) => boolean
) => {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!items) return [];
    if (!query.trim()) return items;
    return items.filter(item => filterFn(item, query));
  }, [items, query, filterFn]);

  return { query, setQuery, filteredItems };
};
