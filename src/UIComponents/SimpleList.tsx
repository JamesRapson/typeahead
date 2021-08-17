import React from "react";
import { PropsWithChildren } from "react";
import "./SimpleList.css";

export type ListItem = {
  id: string;
  label: string;
};

export type SimpleListProps<T> = {
  onSelect: (index: number) => void;
  noResultsText?: string;
  selectedIndex?: number;
};

export const SimpleList = <T extends ListItem>({
  onSelect,
  noResultsText = "No items",
  selectedIndex,
  children,
}: PropsWithChildren<SimpleListProps<T>>) => {
  return (
    <div className="simpleList">
      {React.Children.count(children) === 0 ? (
        <div>{noResultsText}</div>
      ) : (
        React.Children.map(children, (child, index) => (
          <div
            className={`item ${index === selectedIndex ? "selectedItem" : ""}`}
            onClick={() => onSelect(index)}
          >
            {child}
          </div>
        ))
      )}
    </div>
  );
};
