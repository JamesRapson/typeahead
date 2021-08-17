import React, { useEffect, useState } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useDetectClickOutside } from "../hooks/useDetectClickOutside";
import { SearchFunction, SearchResultItem } from "../types";
import { ShadowTextbox } from "./ShadowTextbox";
import { ListItem, SimpleList } from "./SimpleList";
import "./TypeaheadSearch.css";

const defaultText = "Type to search";

export type TypeaheadSearchProps<T> = {
  onSearch: SearchFunction<T>; // Function that performs the search and returns the matching items
  onSelected: (item: T) => void; // Function that will be called when user selects an item
  itemRenderFn: (item: T) => JSX.Element; // Function to render serach result items to show in a list
  placeHolderText?: string;
};

export const TypeaheadSearch = <T extends SearchResultItem>({
  onSearch,
  onSelected,
  itemRenderFn,
  placeHolderText = defaultText,
}: TypeaheadSearchProps<T>) => {
  const [searchString, setSearchString] = useState<string>();
  const [selectedValue, setSelectedValue] = useState<T>();
  const [shadowText, setShadowText] = useState<string | undefined>();
  const [text, setText] = useState<string>();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const rootRef = React.useRef(null);
  const { hasFocus, setHasFocus } = useDetectClickOutside(false, rootRef);
  const { isSearching, searchResults } = useDebouncedSearch(
    onSearch,
    searchString
  );

  useEffect(() => {
    if (!hasFocus && !selectedValue) {
      // clear search when control looses focus if a value has not been selected
      setText("");
      setShadowText(undefined);
      setSearchString(undefined);
    }
  }, [hasFocus, selectedValue]);

  useEffect(() => {
    // Respond to new search results
    if (!searchResults && !selectedValue) {
      setShadowText(undefined);
      return;
    }

    if (searchString) {
      // if the first result item starts with the search string then set the shadow text
      const firstResultItem = searchResults?.[0];
      if (firstResultItem?.label.startsWith(searchString))
        setShadowText(firstResultItem.label);
      else setShadowText(undefined);
    }
    setHighlightedIndex(-1);
  }, [searchResults, searchString, selectedValue]);

  useEffect(() => {
    if (!searchResults || highlightedIndex === -1) return;
    // respond to the highlighted index being changed
    setShadowText(undefined);
    setText(searchResults?.[highlightedIndex]?.label);
  }, [highlightedIndex, searchResults]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!searchResults || searchResults.length === 0) return;

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      // User uses arrow keys to highlight a result
      const direction = event.key === "ArrowUp" ? "Up" : "Down";
      moveHighlightedResult(direction);
      return;
    }

    if (event.key === "Tab" || event.key === "Enter") {
      // Detect the Tab or Enter key press and automatically select either the highlighted or first search result
      const index = highlightedIndex === -1 ? 0 : highlightedIndex;
      selectValue(searchResults?.[index].id);
    }
  };

  const moveHighlightedResult = (direction: "Up" | "Down") => {
    if (!searchResults) return;

    if (highlightedIndex === -1) setHighlightedIndex(0);
    else {
      const currentIndex = highlightedIndex;
      if (direction === "Up" && currentIndex > 0)
        setHighlightedIndex(currentIndex - 1);

      if (direction === "Down" && currentIndex < searchResults.length - 1)
        setHighlightedIndex(currentIndex + 1);
    }
  };

  const onSearchStringChange = (str: string) => {
    if (selectedValue) {
      // Clear any selected value when we have a new search
      setSelectedValue(undefined);
    }

    // update search string to trigger a new search
    setSearchString(str);
    setShadowText(undefined);
    setText(str);
  };

  const onFocus = () => {
    // clear existing values when gets focues
    setHasFocus(true);
    setText("");
    setShadowText(undefined);
    setSearchString(undefined);
    setSelectedValue(undefined);
  };

  const onSearchResultSelected = (index: number) => {
    // User has selected a search value from the dropdown list
    const selectedItem = searchResults?.[index];
    if (selectedItem) selectValue(selectedItem.id);
  };

  const selectValue = (selectedId: string) => {
    const selected = searchResults?.find((res) => res.id === selectedId);
    setText(selected?.label);
    setSelectedValue(selected);
    setSearchString(undefined);
    setShadowText(undefined);
    if (selected) onSelected(selected);
  };

  return (
    <div ref={rootRef} className="typeaheadSearch">
      <ShadowTextbox
        text={text}
        shadowText={shadowText}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onChange={onSearchStringChange}
        showSpinner={isSearching}
        placeHolderText={placeHolderText}
      />

      {searchResults && !selectedValue && (
        <SimpleList
          onSelect={onSearchResultSelected}
          selectedIndex={highlightedIndex}
          noResultsText="No match"
        >
          {searchResults?.map((item) => itemRenderFn(item))}
        </SimpleList>
      )}
    </div>
  );
};
