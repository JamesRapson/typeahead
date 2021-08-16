import "./SimpleList.css";

export type ListItem = {
  id: string;
  label: string;
};

export type SimpleListProps<T> = {
  onSelect: (value: T) => void;
  items: T[];
  noResultsText?: string;
  selectedItem?: T;
  itemRenderFn?: (item: T) => JSX.Element; // Function to render the JSX for an item in the list
};

export const SimpleList = <T extends ListItem>({
  onSelect,
  items,
  noResultsText = "No items",
  selectedItem,
  itemRenderFn,
}: SimpleListProps<T>) => {
  return (
    <div className="simpleList">
      {items.length === 0 ? (
        <div>{noResultsText}</div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`item ${item === selectedItem ? "selectedItem" : ""} `}
          >
            {itemRenderFn ? itemRenderFn(item) : item.label}
          </div>
        ))
      )}
    </div>
  );
};
