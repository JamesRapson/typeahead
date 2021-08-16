import { useCallback, useEffect, useState } from "react";
import { SearchFunction } from "../types";

let debounceTimeout: NodeJS.Timeout;
const debounce = (funct: () => void, interval: number = 200) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(funct, interval);
};

export const useDebouncedSearch = <T extends any>(
  searchFunction: SearchFunction<T>,
  searchString?: string,
  interval: number = 200
) => {
  const [searchResults, setSearchResults] = useState<T[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const executeCallback = useCallback(
    (searchString: string) => {
      return searchFunction(searchString);
    },
    [searchFunction]
  );

  useEffect(() => {
    let stale = false;

    if (!searchString) {
      setSearchResults(undefined);
      return;
    }

    setIsSearching(true);
    debounce(
      () =>
        executeCallback(searchString)
          .then((result) => {
            setIsSearching(false);
            if (stale) {
              console.info("Search cancelled");
              return;
            }

            setSearchResults(result);
          })
          .catch((err) => {
            setIsSearching(false);
            if (stale) {
              return;
            }
            console.error("Search error", err);
          }),
      interval
    );

    return () => {
      stale = true; // flag the request as being stale
    };
  }, [searchString, executeCallback, interval]);

  return { isSearching, searchResults };
};
