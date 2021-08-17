import React from "react";
import { PropsWithChildren } from "react";
import "./SimpleList.css";

export type ListItem = {
  id: string;
  label: string;
};

export type SimpleListProps = {
  onSelect: (index: number) => void;
  noResultsText?: string;
  selectedChildIndex?: number;
};

export const SimpleList = ({
  onSelect,
  noResultsText = "No items",
  selectedChildIndex,
  children,
}: PropsWithChildren<SimpleListProps>) => {
  return (
    <div className="simpleList">
      {React.Children.count(children) === 0 ? (
        <div>{noResultsText}</div>
      ) : (
        React.Children.map(children, (child, index) => (
          <div
            className={`item ${
              index === selectedChildIndex ? "selectedItem" : ""
            }`}
            onClick={() => onSelect(index)}
          >
            {child}
          </div>
        ))
      )}
    </div>
  );
};
